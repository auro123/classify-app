import { FileStack, FileText, GitCompareArrows } from "lucide-react";

import { AppHeader } from "@/components/app-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SingleCountryPanel } from "@/components/single-country-panel";
import { CompareCountriesPanel } from "@/components/compare-countries-panel";
import { BatchUploadPanel } from "@/components/batch-upload-panel";

export const maxDuration = 60;

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
        <Tabs defaultValue="single" className="gap-6">
          <TabsList className="h-auto w-full gap-1 sm:w-fit">
            <TabsTrigger value="single" className="gap-1.5 py-1.5">
              <FileText className="size-4" />
              Single Country
            </TabsTrigger>
            <TabsTrigger value="compare" className="gap-1.5 py-1.5">
              <GitCompareArrows className="size-4" />
              Compare Countries
            </TabsTrigger>
            <TabsTrigger value="batch" className="gap-1.5 py-1.5">
              <FileStack className="size-4" />
              Batch Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="single">
            <SingleCountryPanel />
          </TabsContent>
          <TabsContent value="compare">
            <CompareCountriesPanel />
          </TabsContent>
          <TabsContent value="batch">
            <BatchUploadPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
