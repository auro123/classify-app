import { z } from "zod";

export const flaggedClauseSchema = z.object({
  quote: z.string(),
  issue: z.string(),
  legalBasis: z.string(),
  suggestedRewrite: z.string(),
});

export const analysisResultSchema = z.object({
  overallRisk: z.enum(["low", "medium", "high"]),
  executiveSummary: z.string(),
  flaggedClauses: z.array(flaggedClauseSchema),
  positiveIndicators: z.array(z.string()),
  recommendedNextStep: z.enum(["safe", "minor_fixes", "legal_review_required"]),
});

export type FlaggedClause = z.infer<typeof flaggedClauseSchema>;
export type AnalysisResult = z.infer<typeof analysisResultSchema>;
