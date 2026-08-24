export interface CsvExportRow {
  filename: string;
  country: string;
  overallRisk: string;
  recommendedNextStep: string;
  createdAt: Date;
}

const CSV_COLUMNS: { key: keyof CsvExportRow; header: string }[] = [
  { key: "filename", header: "filename" },
  { key: "country", header: "country" },
  { key: "overallRisk", header: "overallRisk" },
  { key: "recommendedNextStep", header: "recommendedNextStep" },
  { key: "createdAt", header: "createdAt" },
];

function escapeCsvField(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function toCsvValue(row: CsvExportRow, key: keyof CsvExportRow): string {
  const value = row[key];
  return value instanceof Date ? value.toISOString() : String(value);
}

export function buildCsv(rows: CsvExportRow[]): string {
  const lines = [CSV_COLUMNS.map((column) => column.header).join(",")];

  for (const row of rows) {
    lines.push(
      CSV_COLUMNS.map((column) => escapeCsvField(toCsvValue(row, column.key))).join(",")
    );
  }

  return lines.join("\n");
}

export function downloadCsv(rows: CsvExportRow[], filename = "analysis-history.csv"): void {
  const csv = buildCsv(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
