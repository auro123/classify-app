"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search } from "lucide-react";
import { toast } from "sonner";

import { analyzeContractAction } from "@/app/actions/analyze";
import { COUNTRIES } from "@/lib/countries";
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

export function SingleCountryPanel() {
  const [files, setFiles] = useState<File[]>([]);
  const [country, setCountry] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const canAnalyze = files.length > 0 && country !== "" && !isPending;

  function handleAnalyze() {
    const file = files[0];
    if (!file) return;

    startTransition(async () => {
      try {
        const { id } = await analyzeContractAction(file);
        router.push(`/results/${id}`);
      } catch (error) {
        console.error(error);
        toast.error("Analysis failed", {
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
          <FileDropzone files={files} onFilesChange={setFiles} multiple={false} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="single-country">Country</Label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger id="single-country" className="w-full">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
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
          {isPending ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
          {isPending ? "Analyzing…" : "Analyze"}
        </Button>
      </CardContent>
    </Card>
  );
}
