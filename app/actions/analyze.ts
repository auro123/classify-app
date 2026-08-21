"use server";

import { analyzeContract } from "@/lib/analyzeContract";
import { france } from "@/lib/jurisdictions/france";
import prisma from "@/lib/prisma";

export async function analyzeContractAction(file: File): Promise<{ id: string }> {
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
