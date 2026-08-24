import { notFound } from "next/navigation";

import { analysisResultSchema } from "@/lib/analysisSchema";
import prisma from "@/lib/prisma";
import { ResultsView } from "@/components/results-view";

export default async function ResultsPage({ params }: PageProps<"/results/[id]">) {
  const { id } = await params;

  const analysis = await prisma.analysis.findUnique({ where: { id } });
  if (!analysis) {
    notFound();
  }

  if (analysis.status !== "completed") {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <p className="text-sm text-muted-foreground">
          {analysis.status === "failed"
            ? (analysis.errorMessage ?? "This analysis failed.")
            : "This analysis is still processing — check back in a moment."}
        </p>
      </div>
    );
  }

  const result = analysisResultSchema.parse(analysis.result);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <ResultsView
        filename={analysis.filename}
        country={analysis.country}
        createdAt={analysis.createdAt}
        result={result}
      />
    </div>
  );
}
