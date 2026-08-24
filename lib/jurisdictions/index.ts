import { brazil } from "./brazil";
import { france } from "./france";
import { germany } from "./germany";
import { italy } from "./italy";
import { netherlands } from "./netherlands";
import { spain } from "./spain";
import type { Jurisdiction } from "./types";
import { uk } from "./uk";
import { unitedStates } from "./unitedStates";

export const JURISDICTIONS: Record<string, Jurisdiction> = {
  [brazil.slug]: brazil,
  [france.slug]: france,
  [germany.slug]: germany,
  [italy.slug]: italy,
  [netherlands.slug]: netherlands,
  [spain.slug]: spain,
  [uk.slug]: uk,
  [unitedStates.slug]: unitedStates,
};

export const JURISDICTION_LIST: Jurisdiction[] = Object.values(JURISDICTIONS);

export type { Jurisdiction } from "./types";
