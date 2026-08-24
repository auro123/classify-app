"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Loader2, XCircle } from "lucide-react";

import {
  getComparisonGroupAction,
  type ComparisonCountryStatus,
} from "@/app/actions/analyzeComparison";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const POLL_INTERVAL_MS = 4000;

const riskConfig: Record<string, { label: string; className: string }> = {
  low: {
    label: "Low risk",
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-400",
  },
  medium: {
    label: "Medium risk",
    className: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400",
  },
  high: {
    label: "High risk",
    className: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-400",
  },
};

interface ComparisonViewProps {
  groupId: string;
  filename: string;
  initialCountries: ComparisonCountryStatus[];
}

export function ComparisonView({ groupId, filename, initialCountries }: ComparisonViewProps) {
  const [countries, setCountries] = useState(initialCountries);
  const countriesRef = useRef(countries);

  useEffect(() => {
    countriesRef.current = countries;
  }, [countries]);

  useEffect(() => {
    if (!countriesRef.current.some((c) => c.status === "processing")) return;

    const interval = setInterval(async () => {
      if (!countriesRef.current.some((c) => c.status === "processing")) {
        clearInterval(interval);
        return;
      }
      try {
        const data = await getComparisonGroupAction(groupId);
        setCountries(data.countries);
      } catch {
        // Transient poll failure — try again on the next tick.
      }
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [groupId]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{filename}</h2>
        <p className="text-sm text-muted-foreground">
          Comparing {countries.length} {countries.length === 1 ? "country" : "countries"}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {countries.map((country) => (
          <CountryCard key={country.country} country={country} />
        ))}
      </div>
    </div>
  );
}

function CountryCard({ country }: { country: ComparisonCountryStatus }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-base">{country.country}</CardTitle>
          <StatusBadge country={country} />
        </div>
      </CardHeader>
      <CardContent>
        {country.status === "processing" && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Analyzing…
          </div>
        )}

        {country.status === "failed" && (
          <p className="text-sm text-red-700 dark:text-red-400">
            {country.errorMessage ?? "Analysis failed."}
          </p>
        )}

        {country.status === "completed" && country.result && (
          <div className="space-y-3">
            <p className="line-clamp-4 text-sm text-muted-foreground">
              {country.result.executiveSummary}
            </p>
            {country.id && (
              <Link
                href={`/results/${country.id}`}
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                View full results
              </Link>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StatusBadge({ country }: { country: ComparisonCountryStatus }) {
  if (country.status === "processing") {
    return (
      <Badge variant="outline" className="gap-1.5">
        <Loader2 className="size-3 animate-spin" />
        Processing
      </Badge>
    );
  }

  if (country.status === "failed") {
    return (
      <Badge className="gap-1.5 bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-400">
        <XCircle className="size-3.5" />
        Failed
      </Badge>
    );
  }

  const risk = country.overallRisk ? riskConfig[country.overallRisk] : undefined;
  return (
    <Badge className={cn("gap-1.5", risk?.className ?? "bg-muted text-muted-foreground")}>
      {risk?.label ?? country.overallRisk ?? "Unknown"}
    </Badge>
  );
}
