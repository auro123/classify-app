import {
  AlertTriangle,
  CheckCircle2,
  FileWarning,
  Gavel,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import type { ComponentType } from "react";

import type { AnalysisResult } from "@/lib/analysisSchema";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const riskConfig: Record<
  AnalysisResult["overallRisk"],
  { label: string; icon: ComponentType<{ className?: string }>; className: string }
> = {
  low: {
    label: "Low risk",
    icon: CheckCircle2,
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-400",
  },
  medium: {
    label: "Medium risk",
    icon: AlertTriangle,
    className: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400",
  },
  high: {
    label: "High risk",
    icon: FileWarning,
    className: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-400",
  },
};

const nextStepConfig: Record<
  AnalysisResult["recommendedNextStep"],
  { label: string; icon: ComponentType<{ className?: string }>; className: string }
> = {
  safe: {
    label: "Safe to proceed",
    icon: ShieldCheck,
    className: "text-emerald-700 dark:text-emerald-400",
  },
  minor_fixes: {
    label: "Minor fixes recommended",
    icon: ShieldQuestion,
    className: "text-amber-700 dark:text-amber-400",
  },
  legal_review_required: {
    label: "Legal review required",
    icon: Gavel,
    className: "text-red-700 dark:text-red-400",
  },
};

interface ResultsViewProps {
  filename: string;
  country: string;
  createdAt: Date;
  result: AnalysisResult;
}

export function ResultsView({ filename, country, createdAt, result }: ResultsViewProps) {
  const risk = riskConfig[result.overallRisk];
  const RiskIcon = risk.icon;
  const nextStep = nextStepConfig[result.recommendedNextStep];
  const NextStepIcon = nextStep.icon;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle className="text-xl">{filename}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                {country} · analyzed{" "}
                {createdAt.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <Badge className={cn("gap-1.5 px-2.5 py-1 text-sm", risk.className)}>
              <RiskIcon className="size-4" />
              {risk.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium">Executive summary</h3>
            <p className="mt-1 text-sm text-muted-foreground">{result.executiveSummary}</p>
          </div>

          <div className={cn("flex items-center gap-2 text-sm font-medium", nextStep.className)}>
            <NextStepIcon className="size-4" />
            Recommended next step: {nextStep.label}
          </div>
        </CardContent>
      </Card>

      {result.flaggedClauses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Flagged clauses ({result.flaggedClauses.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.flaggedClauses.map((clause, index) => (
              <div key={index} className="space-y-2 rounded-lg border p-4">
                <blockquote className="border-l-2 border-muted-foreground/30 pl-3 text-sm italic text-muted-foreground">
                  “{clause.quote}”
                </blockquote>
                <div>
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Issue
                  </span>
                  <p className="text-sm">{clause.issue}</p>
                </div>
                <div>
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Legal basis
                  </span>
                  <p className="text-sm">{clause.legalBasis}</p>
                </div>
                <div>
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Suggested rewrite
                  </span>
                  <p className="text-sm">{clause.suggestedRewrite}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {result.positiveIndicators.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Positive indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.positiveIndicators.map((indicator, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  {indicator}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
