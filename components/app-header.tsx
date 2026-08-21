import { ScanSearch } from "lucide-react";

export function AppHeader() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4 sm:px-6">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <ScanSearch className="size-5" />
        </div>
        <div>
          <h1 className="text-lg font-semibold leading-tight tracking-tight">
            Classify
          </h1>
          <p className="text-sm text-muted-foreground">
            Analyze filings against country-specific classification rules
          </p>
        </div>
      </div>
    </header>
  );
}
