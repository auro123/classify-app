import Link from "next/link";
import { ArrowUp, History, Home, ScanSearch } from "lucide-react";

interface AppHeaderProps {
  showBackToTop?: boolean;
}

export function AppHeader({ showBackToTop = false }: AppHeaderProps) {
  return (
    <header id="top" className="border-b bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
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

        <nav className="flex items-center gap-4">
          {showBackToTop && (
            <a
              href="#top"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowUp className="size-4" />
              Back to top
            </a>
          )}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Home className="size-4" />
            Home
          </Link>
          <Link
            href="/history"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <History className="size-4" />
            History
          </Link>
        </nav>
      </div>
    </header>
  );
}
