// Placeholder list — will likely come from an API in a later phase.
export const COUNTRIES = [
  "Brazil",
  "France",
  "Germany",
  "Italy",
  "Netherlands",
  "Spain",
  "UK",
  "United States",
] as const;

export type Country = (typeof COUNTRIES)[number];
