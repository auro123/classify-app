"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, RotateCcw, XCircle } from "lucide-react";
import { toast } from "sonner";

import { getBatchAction, type BatchFileStatus } from "@/app/actions/analyzeBatch";
import { retryCountryAnalysisAction } from "@/app/actions/retryCountryAnalysis";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const POLL_INTERVAL_MS = 4000;

const riskBadgeClassName: Record<string, string> = {
  low: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-400",
  medium: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400",
  high: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-400",
};

interface BatchViewProps {
  batchId: string;
  country: string;
  totalFiles: number;
  initialFiles: BatchFileStatus[];
}

export function BatchView({ batchId, country, totalFiles, initialFiles }: BatchViewProps) {
  const [files, setFiles] = useState(initialFiles);
  const filesRef = useRef(files);
  const [retryingIds, setRetryingIds] = useState<Set<string>>(new Set());
  const [, startTransition] = useTransition();

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  useEffect(() => {
    if (!filesRef.current.some((f) => f.status === "processing")) return;

    const interval = setInterval(async () => {
      if (!filesRef.current.some((f) => f.status === "processing")) {
        clearInterval(interval);
        return;
      }
      try {
        const data = await getBatchAction(batchId);
        setFiles(data.files);
      } catch {
        // Transient poll failure — try again on the next tick.
      }
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [batchId]);

  const completed = files.filter((f) => f.status === "completed").length;
  const failed = files.filter((f) => f.status === "failed").length;

  function handleRetry(id: string) {
    setRetryingIds((prev) => new Set(prev).add(id));
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status: "processing" } : f)));

    startTransition(async () => {
      try {
        const result = await retryCountryAnalysisAction(id);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id
              ? {
                  ...f,
                  status: result.status,
                  overallRisk: result.overallRisk,
                  errorMessage: result.errorMessage,
                }
              : f
          )
        );
      } catch (error) {
        toast.error("Retry failed", {
          description: error instanceof Error ? error.message : "Something went wrong.",
        });
        setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status: "failed" } : f)));
      } finally {
        setRetryingIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Batch upload — {country}</h2>
        <p className="text-sm text-muted-foreground">
          {completed} of {totalFiles} complete
          {failed > 0 ? `, ${failed} failed` : ""}
        </p>
      </div>

      <Card>
        <CardContent className="divide-y p-0">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{file.filename}</p>
                {file.status === "failed" && file.errorMessage && (
                  <p className="mt-0.5 text-xs text-red-700 dark:text-red-400">
                    {file.errorMessage}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <FileStatusBadge file={file} isRetrying={retryingIds.has(file.id)} />
                {file.status === "completed" && (
                  <Link
                    href={`/results/${file.id}`}
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    View results
                  </Link>
                )}
                {file.status === "failed" && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={retryingIds.has(file.id)}
                    onClick={() => handleRetry(file.id)}
                  >
                    <RotateCcw className="size-3.5" />
                    Retry
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function FileStatusBadge({
  file,
  isRetrying,
}: {
  file: BatchFileStatus;
  isRetrying: boolean;
}) {
  if (isRetrying || file.status === "processing") {
    return (
      <Badge variant="outline" className="gap-1.5">
        <Loader2 className="size-3 animate-spin" />
        Processing
      </Badge>
    );
  }

  if (file.status === "failed") {
    return (
      <Badge className="gap-1.5 bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-400">
        <XCircle className="size-3.5" />
        Failed
      </Badge>
    );
  }

  const className = file.overallRisk ? riskBadgeClassName[file.overallRisk] : undefined;
  return (
    <Badge className={cn("gap-1.5 capitalize", className ?? "bg-muted text-muted-foreground")}>
      <CheckCircle2 className="size-3.5" />
      {file.overallRisk ?? "Unknown"}
    </Badge>
  );
}
