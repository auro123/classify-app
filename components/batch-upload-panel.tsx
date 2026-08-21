"use client";

import { useState } from "react";
import { Search } from "lucide-react";

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

export function BatchUploadPanel() {
  const [files, setFiles] = useState<File[]>([]);
  const [country, setCountry] = useState<string>("");

  const canAnalyze = files.length > 0 && country !== "";

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label>PDF documents</Label>
          <FileDropzone files={files} onFilesChange={setFiles} multiple />
        </div>

        <div className="space-y-2">
          <Label htmlFor="batch-country">Country</Label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger id="batch-country" className="w-full">
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

        <Button type="button" disabled={!canAnalyze} className="w-full sm:w-auto">
          <Search className="size-4" />
          Analyze batch
        </Button>
      </CardContent>
    </Card>
  );
}
