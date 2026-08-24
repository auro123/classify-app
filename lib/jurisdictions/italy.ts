import type { Jurisdiction } from "./types";

export const italy: Jurisdiction = {
  slug: "italy",
  name: "Italy",

  legalTest: "Subordinazione (Art. 2094 Codice Civile) ed etero-organizzazione (Art. 2, D.Lgs. 81/2015)",

  legalTestDetail:
    "Article 2094 of the Italian Civil Code defines a 'lavoratore subordinato' as a person who undertakes, " +
    "in exchange for pay, to collaborate in the enterprise by providing intellectual or manual work in the " +
    "service of, and under the direction of ('alle dipendenze e sotto la direzione'), the employer. Italian " +
    "courts (giudice del lavoro, and ultimately the Corte di Cassazione, sezione lavoro) assess " +
    "'subordinazione' primarily through 'eterodirezione' — ongoing subjection to the employer's direction on " +
    "how work is performed, not mere coordination of a deliverable — alongside fixed working hours, " +
    "integration into the business organization, and the absence of genuine entrepreneurial risk on the " +
    "worker's part. This is distinguished from 'lavoro autonomo' (self-employment, Art. 2222 Codice Civile), " +
    "where the person undertakes to produce a work or service mainly with their own means, with no " +
    "subordination. Because many gig-economy relationships fall in a grey area — organized by the client as " +
    "to time and place but without full subordination — the 2015 Jobs Act reform (D.Lgs. n. 81/2015, Art. 2) " +
    "extended most employee-protective rules to 'collaborazioni etero-organizzate': continuous, personal " +
    "collaborations whose performance is organized by the client, including as to time and place of work. " +
    "The Corte di Cassazione applied this to food-delivery riders in its landmark decision (Cass., sez. " +
    "lav., n. 1663/2020), and Capo V-bis of D.Lgs. 81/2015 (Artt. 47-bis to 47-octies, introduced by D.L. " +
    "101/2019, conv. L. 128/2019) now sets minimum protections specifically for platform-based delivery " +
    "workers, regardless of whether full subordination is found.",

  keyRiskFactors: [
    "Client directs how the work is performed on an ongoing basis (eterodirezione), not just the expected deliverable",
    "Client organizes the time and place of the work, even without full subordination (etero-organizzazione threshold)",
    "Fixed working hours, mandatory shifts, or a required schedule set unilaterally by the client",
    "Contractor is integrated into the client's organization: company email, participation in internal meetings, place in the org chart",
    "Client provides the equipment, software, vehicle, or premises used to perform the work",
    "Exclusivity or de facto single-client relationship creating economic dependency",
    "Client holds disciplinary power: warnings, performance reviews, or termination for 'misconduct' rather than contractual breach",
    "No genuine entrepreneurial risk: fixed periodic fee (compenso fisso) unrelated to results, resembling a salary",
    "Continuous relationship with no defined project scope or natural end date",
  ],

  redFlagClauses: [
    "Clauses fixing precise working hours, mandatory shifts, or requiring adherence to the client's internal roster/timesheet",
    "Clauses granting the client authority to issue binding directives ('direttive') on execution, or to impose disciplinary sanctions",
    "Exclusivity clauses prohibiting the contractor from working for other clients",
    "Clauses requiring personal performance with no right of substitution or subcontracting",
    "Clauses referring to a 'responsabile' (manager), 'team', or placing the contractor within the client's reporting line",
    "Clauses obligating exclusive use of client-supplied equipment, vehicles, apps, or premises",
    "Termination clauses mirroring disciplinary dismissal rather than ordinary contractual breach and notice",
    "Fixed monthly compenso unrelated to actual deliverables, invoiced via partita IVA on a schedule resembling payroll",
    "Algorithmic scheduling or ranking clauses that determine when and how much work the contractor receives, without a genuine ability to decline",
  ],

  positiveIndicators: [
    "Contractor freely determines their own working hours and method of work, subject only to an agreed deliverable",
    "Contractor simultaneously serves multiple clients under an active partita IVA",
    "Contractor uses their own equipment, tools, and premises, bearing real business expenses and risk",
    "Compensation is tied to deliverables or results rather than time spent, invoiced at market rates that vary by engagement",
    "Contractor has a genuine, exercised right to decline assignments or to delegate work to others",
    "No integration into the client's hierarchy: no company email domain, no line manager, not listed on internal org charts",
    "Contract has a defined scope and end date tied to a specific project rather than an indefinite ongoing engagement",
    "Contractor bears real economic risk of the engagement, with potential for profit or loss",
  ],

  consequencesOfMisclassification:
    "If a court finds the relationship is in reality subordinate employment (or etero-organizzata under Art. " +
    "2 D.Lgs. 81/2015), the client must retroactively apply the applicable national collective bargaining " +
    "agreement (CCNL): minimum wages, tredicesima and quattordicesima (13th/14th month pay), paid leave, and " +
    "TFR (trattamento di fine rapporto, statutory severance accrual). The client is also liable, as the " +
    "actual employer, for unpaid social-security contributions to INPS and workplace-insurance premiums to " +
    "INAIL, plus civil penalties ('sanzioni civili') for late payment that increase the longer the " +
    "irregularity persists. Where contributions were not paid at all because the relationship was disguised " +
    "as autonomous work, the Ispettorato Nazionale del Lavoro (INL) can classify it as undeclared work " +
    "('lavoro nero' or 'sommerso') and impose administrative fines calculated per worker and per day of " +
    "irregular employment, with aggravated fines and a business suspension order (provvedimento di " +
    "sospensione dell'attività imprenditoriale) available where a significant share of a client's workforce " +
    "is found irregular. Large-scale or repeated concealment of the employment relationship can also give " +
    "rise to criminal exposure under labor-law provisions.",

  relevantLaw:
    "Codice Civile: Art. 2094 (lavoro subordinato), Art. 2222 (contratto d'opera / lavoro autonomo). " +
    "D.Lgs. 81/2015: Art. 2 (collaborazioni etero-organizzate) and Capo V-bis, Artt. 47-bis–47-octies " +
    "(tutele minime per i rider e il lavoro tramite piattaforme digitali, introdotto dal D.L. 101/2019, " +
    "conv. L. 128/2019). Legge 92/2012 (Riforma Fornero). Cass., sez. lav., n. 1663/2020 (riders — " +
    "applicazione dell'Art. 2, D.Lgs. 81/2015).",

  enforcementBodies: [
    "Ispettorato Nazionale del Lavoro (INL)",
    "INPS (Istituto Nazionale della Previdenza Sociale) — recupero contributivo",
    "INAIL (Istituto Nazionale Assicurazione contro gli Infortuni sul Lavoro)",
    "Tribunale, sezione lavoro / Corte di Cassazione, sezione lavoro",
  ],
};
