import Anthropic from "@anthropic-ai/sdk";

import { analysisResultSchema, type AnalysisResult } from "@/lib/analysisSchema";
import type { Jurisdiction } from "@/lib/jurisdictions/types";

const client = new Anthropic();

const RESPONSE_SHAPE = `{
  "overallRisk": "low" | "medium" | "high",
  "executiveSummary": string,
  "flaggedClauses": [
    { "quote": string, "issue": string, "legalBasis": string, "suggestedRewrite": string }
  ],
  "positiveIndicators": string[],
  "recommendedNextStep": "safe" | "minor_fixes" | "legal_review_required"
}`;

function buildPrompt(contractText: string, jurisdiction: Jurisdiction): string {
  return `You are an expert employment lawyer specializing in ${jurisdiction.name} employment law, focused specifically on independent contractor misclassification risk.

## Controlling legal test (${jurisdiction.name})

${jurisdiction.legalTest}

${jurisdiction.legalTestDetail}

## Key risk factors under this test

${jurisdiction.keyRiskFactors.map((factor) => `- ${factor}`).join("\n")}

## Common red-flag clause patterns

${jurisdiction.redFlagClauses.map((clause) => `- ${clause}`).join("\n")}

## Indicators that support genuine independent-contractor status

${jurisdiction.positiveIndicators.map((indicator) => `- ${indicator}`).join("\n")}

## Consequences of misclassification

${jurisdiction.consequencesOfMisclassification}

## Relevant law

${jurisdiction.relevantLaw}

## Enforcement bodies

${jurisdiction.enforcementBodies.join(", ")}

## Your task

Step 1 — First, determine whether the document below is actually an independent contractor / freelance / consulting services agreement. If it is clearly NOT such a document (e.g. it's an NDA, a lease, an unrelated document, or unreadable/garbled text), do not attempt a misclassification analysis. Instead return the JSON shape below with "overallRisk" set to "low", "executiveSummary" explaining that the document does not appear to be a contractor agreement and therefore could not be analyzed, "flaggedClauses" and "positiveIndicators" as empty arrays, and "recommendedNextStep" set to "safe".

Step 2 — If it IS a contractor agreement, analyze every clause against the legal test above and produce the JSON result described below.

Rules you must follow:
- Every "quote" field in flaggedClauses MUST be copied EXACTLY, verbatim, character-for-character from the contract text below. Do not paraphrase, summarize, or reconstruct the quote from memory — copy it.
- Be conservative: when a clause is ambiguous or borderline, flag it rather than omit it. It is much worse to miss a real subordination indicator than to over-flag a clause that turns out to be fine.
- Ground every "legalBasis" in the specific law, article, or case law provided above — do not invent legal citations that were not given to you.
- Respond with ONLY valid JSON matching this exact shape below, and NOTHING else: no prose before or after it, no explanations, no markdown, and no code fences (no \`\`\`).

${RESPONSE_SHAPE}

## Contract text

"""
${contractText}
"""`;
}

function stripCodeFence(text: string): string {
  return text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
}

async function callClaude(
  contractText: string,
  jurisdiction: Jurisdiction,
): Promise<AnalysisResult> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 4096,
    messages: [{ role: "user", content: buildPrompt(contractText, jurisdiction) }],
  });

  const textBlock = response.content.find(
    (block): block is Anthropic.TextBlock => block.type === "text",
  );
  if (!textBlock) {
    throw new Error("Claude response did not include a text block");
  }

  const raw: unknown = JSON.parse(stripCodeFence(textBlock.text));
  return analysisResultSchema.parse(raw);
}

export async function analyzeContract(
  contractText: string,
  jurisdiction: Jurisdiction,
): Promise<AnalysisResult> {
  try {
    return await callClaude(contractText, jurisdiction);
  } catch {
    // The model occasionally returns malformed JSON or a schema mismatch —
    // one retry of the full call resolves this in practice.
    return await callClaude(contractText, jurisdiction);
  }
}
