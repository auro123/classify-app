"use server";

import { analyzeContract } from "@/lib/analyzeContract";
import { JURISDICTION_LIST } from "@/lib/jurisdictions";
import prisma from "@/lib/prisma";

export interface RetryAnalysisResult {
  status: "completed" | "failed";
  overallRisk: string | null;
  errorMessage: string | null;
}

// Re-runs a single failed row synchronously. Unlike the batch/comparison
// kickoffs, this is one call tied 1:1 to the request, so it's simply
// awaited directly rather than scheduled with after().
export async function retryCountryAnalysisAction(analysisId: string): Promise<RetryAnalysisResult> {
  const analysis = await prisma.analysis.findUnique({ where: { id: analysisId } });
  if (!analysis) {
    throw new Error("Analysis not found.");
  }

  const jurisdiction = JURISDICTION_LIST.find((j) => j.name === analysis.country);
  if (!jurisdiction) {
    throw new Error(`No jurisdiction data found for "${analysis.country}".`);
  }

  await prisma.analysis.update({
    where: { id: analysisId },
    data: { status: "processing", errorMessage: null },
  });

  try {
    const result = await analyzeContract(analysis.contractText, jurisdiction);
    await prisma.analysis.update({
      where: { id: analysisId },
      data: {
        result,
        overallRisk: result.overallRisk,
        status: "completed",
      },
    });
    return { status: "completed", overallRisk: result.overallRisk, errorMessage: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Analysis failed.";
    await prisma.analysis.update({
      where: { id: analysisId },
      data: { status: "failed", errorMessage },
    });
    return { status: "failed", overallRisk: null, errorMessage };
  }
}
