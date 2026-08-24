"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search } from "lucide-react";
import { toast } from "sonner";

import { analyzeBatchAction } from "@/app/actions/analyzeBatch";
import { JURISDICTION_LIST } from "@/lib/jurisdictions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileDropzone } from "@/components/file-dropzone";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export function BatchUploadPanel() {
  const [files, setFiles] = useState<File[]>([]);
  const [jurisdictionSlug, setJurisdictionSlug] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const canAnalyze = files.length > 0 && jurisdictionSlug !== "" && !isPending;

  function handleAnalyze() {
    if (files.length === 0) return;

    startTransition(async () => {
      try {
        const { batchId } = await analyzeBatchAction(files, jurisdictionSlug);
        router.push(`/batch/${batchId}`);
      } catch (error) {
        console.error(error);
        toast.error("Batch upload failed to start", {
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
          <Label>PDF documents</Label>
          <FileDropzone
            files={files}
            onFilesChange={setFiles}
            multiple
            maxSizeBytes={MAX_FILE_SIZE_BYTES}
            onFileRejected={(file, reason) => {
              toast.error(`Couldn't add "${file.name}"`, { description: reason });
            }}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="batch-country">Country</Label>
          <Select value={jurisdictionSlug} onValueChange={setJurisdictionSlug}>
            <SelectTrigger id="batch-country" className="w-full">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {JURISDICTION_LIST.map((jurisdiction) => (
                <SelectItem key={jurisdiction.slug} value={jurisdiction.slug}>
                  {jurisdiction.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
          {isPending ? "Starting batch…" : "Analyze batch"}
        </Button>
      </CardContent>
    </Card>
  );
}
