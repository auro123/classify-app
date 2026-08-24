import { notFound } from "next/navigation";

import { getBatchAction } from "@/app/actions/analyzeBatch";
import { AppHeader } from "@/components/app-header";
import { BatchView } from "@/components/batch-view";

export const maxDuration = 60;

export default async function BatchPage({ params }: PageProps<"/batch/[batchId]">) {
  const { batchId } = await params;

  let data;
  try {
    data = await getBatchAction(batchId);
  } catch {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
        <BatchView
          batchId={batchId}
          country={data.country}
          totalFiles={data.totalFiles}
          initialFiles={data.files}
        />
      </main>
    </div>
  );
}
