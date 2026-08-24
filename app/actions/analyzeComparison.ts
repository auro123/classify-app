"use server";

import { after } from "next/server";

import { analyzeContract } from "@/lib/analyzeContract";
import { analysisResultSchema, type AnalysisResult } from "@/lib/analysisSchema";
import { Prisma } from "@/lib/generated/prisma/client";
import { JURISDICTIONS, type Jurisdiction } from "@/lib/jurisdictions";
import prisma from "@/lib/prisma";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
// Below this, treat the PDF as having no real extractable text (e.g. a scanned
// image with no OCR layer) rather than trying to analyze near-empty content.
const MIN_EXTRACTABLE_TEXT_LENGTH = 50;

export type ComparisonStatus = "processing" | "completed" | "failed";

export interface ComparisonCountryStatus {
  id: string | null;
  country: string;
  status: ComparisonStatus;
  overallRisk: string | null;
  result: AnalysisResult | null;
  errorMessage: string | null;
}

export interface ComparisonGroupData {
  filename: string;
  countries: ComparisonCountryStatus[];
}

export async function analyzeComparisonAction(
  file: File,
  jurisdictionSlugs: string[]
): Promise<{ groupId: string }> {
  const jurisdictions = jurisdictionSlugs
    .map((slug) => JURISDICTIONS[slug])
    .filter((jurisdiction): jurisdiction is Jurisdiction => Boolean(jurisdiction));

  if (jurisdictions.length === 0) {
    throw new Error("Please select at least one country to compare.");
  }

  // Client-side validation can be bypassed, so re-check both conditions here.
  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (!isPdf) {
    throw new Error("Only PDF files are supported.");
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error("File is larger than 10MB. Please upload a smaller PDF.");
  }

  // Must be imported before PDFParse so it doesn't fall back to a worker file
  // path the bundler can't resolve in a serverless/edge deployment.
  await import("pdf-parse/worker");
  const { PDFParse } = await import("pdf-parse");

  const buffer = Buffer.from(await file.arrayBuffer());
  const parser = new PDFParse({ data: buffer });

  let contractText: string;
  try {
    const parsed = await parser.getText();
    contractText = parsed.text;
  } finally {
    await parser.destroy();
  }

  if (contractText.trim().length < MIN_EXTRACTABLE_TEXT_LENGTH) {
    throw new Error(
      "This PDF doesn't contain extractable text — it looks like a scanned image. Only text-based PDFs are supported."
    );
  }

  const group = await prisma.comparisonGroup.create({
    data: {
      filename: file.name,
      countries: jurisdictions.map((jurisdiction) => jurisdiction.name),
    },
  });

  // Create one placeholder row per country up front, in "processing" status,
  // so the comparison page has something to poll for immediately.
  const analyses = await Promise.all(
    jurisdictions.map((jurisdiction) =>
      prisma.analysis.create({
        data: {
          filename: file.name,
          country: jurisdiction.name,
          contractText,
          result: Prisma.JsonNull,
          status: "processing",
          comparisonGroupId: group.id,
        },
      })
    )
  );

  // Fire off one analysis per country without awaiting — the group id is
  // returned to the caller immediately, and each country's row is updated
  // independently as its own call finishes (or fails). Scheduled via after()
  // rather than a bare fire-and-forget promise: on Vercel, the serverless
  // function is frozen/torn down right after the response is sent, which
  // would otherwise kill this work before it ever reaches the try/catch
  // below. after() keeps the invocation alive until it settles.
  for (const [index, jurisdiction] of jurisdictions.entries()) {
    const analysisId = analyses[index].id;

    after(async () => {
      try {
        const result = await analyzeContract(contractText, jurisdiction);
        await prisma.analysis.update({
          where: { id: analysisId },
          data: {
            result,
            overallRisk: result.overallRisk,
            status: "completed",
          },
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Analysis failed.";

        // This update itself can fail (e.g. a transient DB blip). Nothing
        // awaits this callback, so an uncaught rejection here would
        // otherwise be unhandled — on some Node versions that terminates the
        // whole process, silently leaving every other in-flight row stuck on
        // "processing" too. Catch and log instead of letting that happen.
        try {
          await prisma.analysis.update({
            where: { id: analysisId },
            data: {
              status: "failed",
              errorMessage,
            },
          });
        } catch (updateError) {
          console.error(
            `Failed to mark analysis ${analysisId} (${jurisdiction.name}) as failed:`,
            updateError
          );
        }
      }
    });
  }

  return { groupId: group.id };
}

export async function getComparisonGroupAction(groupId: string): Promise<ComparisonGroupData> {
  const group = await prisma.comparisonGroup.findUnique({
    where: { id: groupId },
    include: { analyses: true },
  });

  if (!group) {
    throw new Error("Comparison not found.");
  }

  const countries: ComparisonCountryStatus[] = group.countries.map((countryName) => {
    const analysis = group.analyses.find((a) => a.country === countryName);

    if (!analysis) {
      return {
        id: null,
        country: countryName,
        status: "processing",
        overallRisk: null,
        result: null,
        errorMessage: null,
      };
    }

    const status = analysis.status as ComparisonStatus;
    const parsedResult =
      status === "completed" ? analysisResultSchema.safeParse(analysis.result) : null;

    return {
      id: analysis.id,
      country: countryName,
      status,
      overallRisk: analysis.overallRisk,
      result: parsedResult?.success ? parsedResult.data : null,
      errorMessage: analysis.errorMessage,
    };
  });

  return { filename: group.filename, countries };
}
