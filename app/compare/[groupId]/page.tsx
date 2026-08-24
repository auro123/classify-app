import { notFound } from "next/navigation";

import { getComparisonGroupAction } from "@/app/actions/analyzeComparison";
import { AppHeader } from "@/components/app-header";
import { ComparisonView } from "@/components/comparison-view";

export const maxDuration = 60;

export default async function ComparePage({ params }: PageProps<"/compare/[groupId]">) {
  const { groupId } = await params;

  let data;
  try {
    data = await getComparisonGroupAction(groupId);
  } catch {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
        <ComparisonView
          groupId={groupId}
          filename={data.filename}
          initialCountries={data.countries}
        />
      </main>
    </div>
  );
}
