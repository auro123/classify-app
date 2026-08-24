"use client";

import Link from "next/link";
import { Download } from "lucide-react";

import { downloadCsv } from "@/lib/exportCsv";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const riskBadgeClassName: Record<string, string> = {
  low: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-400",
  medium: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400",
  high: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-400",
};

export interface HistoryRow {
  id: string;
  filename: string;
  country: string;
  overallRisk: string;
  recommendedNextStep: string;
  createdAt: Date;
}

interface HistoryTableProps {
  rows: HistoryRow[];
}

export function HistoryTable({ rows }: HistoryTableProps) {
  function handleExport() {
    downloadCsv(rows);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight">Analysis history</h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleExport}
          disabled={rows.length === 0}
        >
          <Download className="size-4" />
          Export CSV
        </Button>
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No analyses yet — run one from the Analyze tab to see it here.
        </p>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Filename</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Overall risk</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Results</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="max-w-[240px] truncate font-medium">
                    {row.filename}
                  </TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "capitalize",
                        riskBadgeClassName[row.overallRisk] ?? "bg-muted text-muted-foreground"
                      )}
                    >
                      {row.overallRisk}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {row.createdAt.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/results/${row.id}`}
                      className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
