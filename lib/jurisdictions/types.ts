export interface Jurisdiction {
  slug: string;
  name: string;

  /** Short label for the controlling legal test, e.g. "faisceau d'indices". */
  legalTest: string;
  /** Full explanation of how the test is applied and by whom. */
  legalTestDetail: string;

  keyRiskFactors: string[];
  redFlagClauses: string[];
  positiveIndicators: string[];

  consequencesOfMisclassification: string;
  relevantLaw: string;
  enforcementBodies: string[];
}
