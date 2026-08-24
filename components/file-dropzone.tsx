"use client";

import { type DragEvent, useId, useRef, useState } from "react";
import { FileText, Upload, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface FileDropzoneProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  title?: string;
  description?: string;
  maxSizeBytes?: number;
  onFileRejected?: (file: File, reason: string) => void;
}

export function FileDropzone({
  files,
  onFilesChange,
  multiple = false,
  accept = "application/pdf",
  title,
  description,
  maxSizeBytes,
  onFileRejected,
}: FileDropzoneProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function addFiles(incoming: FileList | null) {
    if (!incoming || incoming.length === 0) return;

    const acceptedFiles: File[] = [];
    for (const file of Array.from(incoming)) {
      const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
      if (!isPdf) {
        onFileRejected?.(file, "Only PDF files are supported.");
        continue;
      }
      if (maxSizeBytes && file.size > maxSizeBytes) {
        onFileRejected?.(
          file,
          `File is larger than ${formatFileSize(maxSizeBytes)}. Please upload a smaller PDF.`
        );
        continue;
      }
      acceptedFiles.push(file);
    }
    if (acceptedFiles.length === 0) return;

    if (multiple) {
      onFilesChange([...files, ...acceptedFiles]);
    } else {
      onFilesChange([acceptedFiles[0]]);
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    addFiles(event.dataTransfer.files);
  }

  function handleRemove(index: number) {
    onFilesChange(files.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/50"
        )}
      >
        <div className="flex size-10 items-center justify-center rounded-full bg-muted">
          <Upload className="size-5 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">
            {title ?? (multiple ? "Drag & drop PDF files" : "Drag & drop a PDF file")}
          </p>
          <p className="text-xs text-muted-foreground">
            {description ?? "or click to browse from your computer"}
          </p>
        </div>
        <input
          id={inputId}
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onClick={(event) => {
            // allow re-selecting the same file
            (event.target as HTMLInputElement).value = "";
          }}
          onChange={(event) => addFiles(event.target.files)}
        />
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 rounded-md border bg-card px-3 py-2 text-sm"
            >
              <FileText className="size-4 shrink-0 text-muted-foreground" />
              <span className="flex-1 truncate">{file.name}</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-6 shrink-0"
                onClick={(event) => {
                  event.stopPropagation();
                  handleRemove(index);
                }}
              >
                <X className="size-3.5" />
                <span className="sr-only">Remove {file.name}</span>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
