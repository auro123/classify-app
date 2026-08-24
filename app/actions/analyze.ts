"use server";

import { analyzeContract } from "@/lib/analyzeContract";
import { france } from "@/lib/jurisdictions/france";
import prisma from "@/lib/prisma";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
// Below this, treat the PDF as having no real extractable text (e.g. a scanned
// image with no OCR layer) rather than trying to analyze near-empty content.
const MIN_EXTRACTABLE_TEXT_LENGTH = 50;

export async function analyzeContractAction(file: File): Promise<{ id: string }> {
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

  const result = await analyzeContract(contractText, france);

  const analysis = await prisma.analysis.create({
    data: {
      filename: file.name,
      country: france.name,
      contractText,
      result,
      overallRisk: result.overallRisk,
    },
  });

  return { id: analysis.id };
}
