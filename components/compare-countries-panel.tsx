"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search } from "lucide-react";
import { toast } from "sonner";

import { analyzeComparisonAction } from "@/app/actions/analyzeComparison";
import { JURISDICTION_LIST } from "@/lib/jurisdictions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CountryMultiSelect } from "@/components/country-multi-select";
import { FileDropzone } from "@/components/file-dropzone";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

const COUNTRY_OPTIONS = JURISDICTION_LIST.map((jurisdiction) => ({
  value: jurisdiction.slug,
  label: jurisdiction.name,
}));

export function CompareCountriesPanel() {
  const [files, setFiles] = useState<File[]>([]);
  const [jurisdictionSlugs, setJurisdictionSlugs] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const canAnalyze = files.length > 0 && jurisdictionSlugs.length > 0 && !isPending;

  function handleAnalyze() {
    const file = files[0];
    if (!file) return;

    startTransition(async () => {
      try {
        const { groupId } = await analyzeComparisonAction(file, jurisdictionSlugs);
        router.push(`/compare/${groupId}`);
      } catch (error) {
        console.error(error);
        toast.error("Comparison failed to start", {
          description:
            error instanceof Error ? error.message : "Something went wrong. Please try again.",
        });
      }
    });
  }

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label>PDF document</Label>
          <FileDropzone
            files={files}
            onFilesChange={setFiles}
            multiple={false}
            maxSizeBytes={MAX_FILE_SIZE_BYTES}
            onFileRejected={(file, reason) => {
              toast.error(`Couldn't add "${file.name}"`, { description: reason });
            }}
          />
        </div>

        <div className="space-y-2">
          <Label>Countries to compare</Label>
          <CountryMultiSelect
            options={COUNTRY_OPTIONS}
            selected={jurisdictionSlugs}
            onSelectedChange={setJurisdictionSlugs}
          />
        </div>

        <Button
          type="button"
          disabled={!canAnalyze}
          onClick={handleAnalyze}
          className="w-full sm:w-auto"
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Search className="size-4" />
          )}
          {isPending ? "Starting comparison…" : "Analyze"}
        </Button>
      </CardContent>
    </Card>
  );
}
