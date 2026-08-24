import type { Jurisdiction } from "./types";

export const germany: Jurisdiction = {
  slug: "germany",
  name: "Germany",

  legalTest: "Scheinselbstständigkeit-Prüfung (Gesamtbild der Arbeitsleistung), § 7 Abs. 1 SGB IV",

  legalTestDetail:
    "German law defines 'Beschäftigung' (dependent employment) in § 7 Abs. 1 Sozialgesetzbuch IV (SGB IV) as " +
    "non-self-employed work, in particular work performed in an employment relationship. Indicators are " +
    "Weisungsgebundenheit (being bound by the instructions of the party issuing work — as to time, duration, " +
    "place, and manner of the work) and Eingliederung in die Arbeitsorganisation des Weisungsgebers " +
    "(integration into the instruction-giver's work organization). Courts — the Bundessozialgericht (BSG) " +
    "for social-security status and the Bundesarbeitsgericht (BAG) for employment-law status — apply a " +
    "'Gesamtbild der Arbeitsleistung' (overall-picture) test, weighing the totality of circumstances as they " +
    "actually operate over the contract's formal wording. Key indicators of 'Scheinselbstständigkeit' " +
    "(bogus/sham self-employment) include fixed working hours, integration into the client's teams and " +
    "processes, use of the client's equipment and premises, absence of genuine entrepreneurial risk " +
    "(kein Unternehmerrisiko — no own capital investment, no chance of profit or loss beyond agreed fees), " +
    "and economic dependency on a single client. Since 1999, a worker or client can request a binding status " +
    "determination (Statusfeststellungsverfahren) from the Deutsche Rentenversicherung Bund (DRV) under " +
    "§ 7a SGB IV — since 2022 this can also be requested prospectively before work begins. The 2017 " +
    "codification of § 611a BGB restated the same Weisungsgebundenheit/Fremdbestimmtheit criteria for civil " +
    "employment-contract classification. The BAG's crowdworking decision (BAG, Urteil v. 1.12.2020, " +
    "9 AZR 102/20) held that a platform worker performing simple, app-assigned micro-tasks under the " +
    "platform's incentive and rating system was in fact an employee, despite the platform's terms describing " +
    "the relationship as freelance.",

  keyRiskFactors: [
    "Client fixes working hours, requires attendance during specific times, or requires the contractor to follow the client's shift/duty roster",
    "Contractor is integrated into the client's teams: company email address, participation in internal meetings, place in the org chart",
    "Client supplies the equipment, software licenses, or workspace used to perform the work",
    "Contractor works for a single client (or one client provides the overwhelming majority of income), creating economic dependency (wirtschaftliche Abhängigkeit)",
    "Client directs the detailed method of the work, not merely the expected deliverable",
    "No genuine entrepreneurial risk: fixed fee regardless of outcome, no own capital investment, no realistic chance of profit or loss",
    "Contractor has no exercised right to send a substitute or delegate the work to others (höchstpersönliche Leistungspflicht)",
    "Long-running, continuous engagement with no defined project scope or end date, invoiced monthly like a salary",
    "Contractor must request approval for absences or holidays similar to an employee",
  ],

  redFlagClauses: [
    "Clauses fixing precise working hours, requiring the contractor to follow the client's internal schedule, or requiring use of the client's time-tracking/attendance system",
    "Exclusivity clauses prohibiting work for other clients during the term",
    "Clauses granting the client authority to issue binding 'Weisungen' (instructions) on how the work is to be performed",
    "Clauses requiring personal performance with no right of substitution (kein Vertretungsrecht)",
    "Clauses requiring advance approval of absences or vacation, mirroring an employee's leave request process",
    "Clauses referring to the contractor's 'Vorgesetzter' (supervisor), 'Team', or placing them within the client's internal hierarchy",
    "Clauses obligating exclusive use of client-supplied hardware, software, or premises",
    "Fixed monthly fee unrelated to actual deliverables, paid on the same schedule as payroll",
    "Non-compete or exclusivity obligations disproportionate to a genuine B2B relationship, without separate compensation",
  ],

  positiveIndicators: [
    "Contractor freely sets their own working hours and determines how the work gets done",
    "Contractor simultaneously serves multiple clients and can show active market/business activity (own website, marketing, other contracts)",
    "Contractor uses their own equipment, tools, and premises, and bears real business expenses and risk",
    "Compensation is tied to deliverables or milestones rather than time worked, invoiced under the contractor's own business registration (Gewerbeanmeldung) and VAT ID",
    "Contractor has a genuine, exercised right to delegate or subcontract the work to employees or third parties",
    "No integration into the client's hierarchy: no company email domain, no line manager, not listed on the internal org chart",
    "Contract has a defined scope and end date tied to a specific project or deliverable",
    "Contractor bears real economic risk, with potential for profit or loss depending on how efficiently the work is performed",
  ],

  consequencesOfMisclassification:
    "If the DRV or a court finds Scheinselbstständigkeit, the client becomes retroactively liable, as the " +
    "deemed employer, for the full employer's and employee's share of social-security contributions " +
    "(Sozialversicherungsbeiträge — pension, health, long-term care, and unemployment insurance) on all sums " +
    "paid. The standard limitation period is 4 years (§ 25 Abs. 1 SGB IV), extended to 30 years where the " +
    "underpayment was intentional (vorsätzlich vorenthalten) — a bar that is often met once an employer has " +
    "been told a relationship looks like disguised employment and continues it anyway. The client can only " +
    "recover the employee's share retroactively from the worker in narrow circumstances (limited to the next " +
    "three payroll periods under § 28g SGB IV), so the employer effectively bears both shares for the past " +
    "period. Late-payment surcharges (Säumniszuschläge) and interest also apply. Intentional withholding of " +
    "social-security contributions is a criminal offense under § 266a Strafgesetzbuch (StGB) — punishable by " +
    "a fine or imprisonment of up to 5 years (up to 10 years in especially serious cases), with personal " +
    "liability exposure for the responsible managing director (Geschäftsführerhaftung). The worker can " +
    "separately claim statutory employee rights before the Arbeitsgericht: paid leave (Bundesurlaubsgesetz), " +
    "continued pay during illness (Entgeltfortzahlung), and dismissal protection (Kündigungsschutzgesetz) if " +
    "the relevant thresholds are met.",

  relevantLaw:
    "SGB IV (Sozialgesetzbuch, Viertes Buch): § 7 Abs. 1 (Definition der Beschäftigung), § 7a " +
    "(Statusfeststellungsverfahren bei der DRV), § 25 (Verjährung von Beitragsansprüchen), § 28g " +
    "(Nachforderung des Arbeitnehmeranteils). § 611a Bürgerliches Gesetzbuch (BGB) (Arbeitsvertrag). " +
    "§ 266a Strafgesetzbuch (StGB) (Vorenthalten und Veruntreuen von Arbeitsentgelt). " +
    "Schwarzarbeitsbekämpfungsgesetz (SchwarzArbG). Kündigungsschutzgesetz (KSchG) and " +
    "Bundesurlaubsgesetz (BUrlG) for reclassified-employee entitlements. BAG, Urteil v. 1.12.2020, " +
    "9 AZR 102/20 (Crowdworker-Entscheidung).",

  enforcementBodies: [
    "Deutsche Rentenversicherung Bund (DRV) — Statusfeststellung und Betriebsprüfung",
    "Zoll / Finanzkontrolle Schwarzarbeit (FKS) — Bekämpfung von Schwarzarbeit und illegaler Beschäftigung",
    "Arbeitsgerichte / Bundesarbeitsgericht (BAG) — arbeitsrechtlicher Status",
    "Krankenkassen (gesetzliche Krankenversicherungen) — Beitragseinzug",
  ],
};
