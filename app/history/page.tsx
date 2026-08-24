import { analysisResultSchema } from "@/lib/analysisSchema";
import prisma from "@/lib/prisma";
import { AppHeader } from "@/components/app-header";
import { HistoryTable } from "@/components/history-table";

export default async function HistoryPage() {
  const analyses = await prisma.analysis.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows = analyses.map((analysis) => {
    const result = analysisResultSchema.safeParse(analysis.result);

    return {
      id: analysis.id,
      filename: analysis.filename,
      country: analysis.country,
      overallRisk: analysis.overallRisk,
      recommendedNextStep: result.success ? result.data.recommendedNextStep : "unknown",
      createdAt: analysis.createdAt,
    };
  });

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
        <HistoryTable rows={rows} />
      </main>
    </div>
  );
}
