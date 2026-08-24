"use server";

import { after } from "next/server";

import { analyzeContract } from "@/lib/analyzeContract";
import { Prisma } from "@/lib/generated/prisma/client";
import { JURISDICTIONS } from "@/lib/jurisdictions";
import prisma from "@/lib/prisma";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
// Below this, treat the PDF as having no real extractable text (e.g. a scanned
// image with no OCR layer) rather than trying to analyze near-empty content.
const MIN_EXTRACTABLE_TEXT_LENGTH = 50;

export type BatchItemStatus = "processing" | "completed" | "failed";

export interface BatchFileStatus {
  id: string;
  filename: string;
  status: BatchItemStatus;
  overallRisk: string | null;
  errorMessage: string | null;
}

export interface BatchData {
  country: string;
  totalFiles: number;
  files: BatchFileStatus[];
}

export async function analyzeBatchAction(
  files: File[],
  jurisdictionSlug: string
): Promise<{ batchId: string }> {
  const jurisdiction = JURISDICTIONS[jurisdictionSlug];
  if (!jurisdiction) {
    throw new Error("Please select a valid country.");
  }
  if (files.length === 0) {
    throw new Error("Please add at least one PDF file.");
  }

  // Client-side validation can be bypassed, so re-check every file here.
  for (const file of files) {
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      throw new Error(`"${file.name}" is not a PDF file.`);
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new Error(`"${file.name}" is larger than 10MB.`);
    }
  }

  const batch = await prisma.batch.create({
    data: {
      country: jurisdiction.name,
      totalFiles: files.length,
      status: "processing",
    },
  });

  // Extract text and create a placeholder row for every file up front, so
  // the batch page has something to poll for immediately. A file that fails
  // to parse (or has no extractable text) is marked "failed" right away
  // rather than aborting the rest of the batch.
  const items = await Promise.all(
    files.map(async (file) => {
      try {
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
          const analysis = await prisma.analysis.create({
            data: {
              filename: file.name,
              country: jurisdiction.name,
              contractText,
              result: Prisma.JsonNull,
              status: "failed",
              errorMessage:
                "This PDF doesn't contain extractable text — it looks like a scanned image. Only text-based PDFs are supported.",
              batchId: batch.id,
            },
          });
          return { analysisId: analysis.id, contractText: null };
        }

        const analysis = await prisma.analysis.create({
          data: {
            filename: file.name,
            country: jurisdiction.name,
            contractText,
            result: Prisma.JsonNull,
            status: "processing",
            batchId: batch.id,
          },
        });
        return { analysisId: analysis.id, contractText };
      } catch (error) {
        const analysis = await prisma.analysis.create({
          data: {
            filename: file.name,
            country: jurisdiction.name,
            contractText: "",
            result: Prisma.JsonNull,
            status: "failed",
            errorMessage: error instanceof Error ? error.message : "Failed to read this PDF.",
            batchId: batch.id,
          },
        });
        return { analysisId: analysis.id, contractText: null };
      }
    })
  );

  // Fire off one analysis per successfully-parsed file without awaiting —
  // the batch id is returned to the caller immediately, and each file's row
  // is updated independently as its own call finishes (or fails). Scheduled
  // via after() rather than a bare fire-and-forget promise: on Vercel, the
  // serverless function is frozen/torn down right after the response is
  // sent, which would otherwise kill this work before it ever reaches the
  // try/catch below. after() keeps the invocation alive until it settles.
  for (const item of items) {
    if (!item.contractText) continue;
    const { analysisId, contractText } = item;

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
          console.error(`Failed to mark analysis ${analysisId} as failed:`, updateError);
        }
      }
    });
  }

  return { batchId: batch.id };
}

export async function getBatchAction(batchId: string): Promise<BatchData> {
  const batch = await prisma.batch.findUnique({
    where: { id: batchId },
    include: { analyses: { orderBy: { createdAt: "asc" } } },
  });

  if (!batch) {
    throw new Error("Batch not found.");
  }

  const files: BatchFileStatus[] = batch.analyses.map((analysis) => ({
    id: analysis.id,
    filename: analysis.filename,
    status: analysis.status as BatchItemStatus,
    overallRisk: analysis.overallRisk,
    errorMessage: analysis.errorMessage,
  }));

  return { country: batch.country, totalFiles: batch.totalFiles, files };
}
