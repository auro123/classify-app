"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { COUNTRIES } from "@/lib/countries";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CountryMultiSelect } from "@/components/country-multi-select";
import { FileDropzone } from "@/components/file-dropzone";

export function CompareCountriesPanel() {
  const [files, setFiles] = useState<File[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  const canAnalyze = files.length > 0 && countries.length > 0;

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label>PDF document</Label>
          <FileDropzone files={files} onFilesChange={setFiles} multiple={false} />
        </div>

        <div className="space-y-2">
          <Label>Countries to compare</Label>
          <CountryMultiSelect
            countries={COUNTRIES}
            selected={countries}
            onSelectedChange={setCountries}
          />
        </div>

        <Button type="button" disabled={!canAnalyze} className="w-full sm:w-auto">
          <Search className="size-4" />
          Analyze
        </Button>
      </CardContent>
    </Card>
  );
}
