import type { Jurisdiction } from "./types";

export const netherlands: Jurisdiction = {
  slug: "netherlands",
  name: "Netherlands",

  legalTest: "Gezag, arbeid en loon (Art. 7:610 BW) — holistische weging na het Deliveroo-arrest",

  legalTestDetail:
    "Dutch law defines an 'arbeidsovereenkomst' (employment contract) in Art. 7:610 of the Burgerlijk " +
    "Wetboek (BW) as an agreement under which one party (the worker) commits to perform work for the other " +
    "party (the employer) for a period of time, in return for pay, under the employer's authority ('gezag'). " +
    "The Hoge Raad's landmark Deliveroo judgment (HR 24 maart 2023, ECLI:NL:HR:2023:443) confirmed that all " +
    "relevant circumstances must be weighed together in a 'holistische weging' (holistic weighing) — the " +
    "label the parties give the contract is not decisive; what matters is how the relationship actually " +
    "operates in practice. Building on the Hoge Raad's earlier 'X/Gemeente Amsterdam' framework (HR 6 " +
    "november 2020, ECLI:NL:HR:2020:1746), relevant factors include: the nature and duration of the work, " +
    "the way the work and working hours are determined, the degree of embeddedness in the client's " +
    "organization ('inbedding'), whether there is an obligation to perform the work personally, how pay is " +
    "determined, the level of pay relative to comparable employees, the commercial risk borne by the worker, " +
    "and whether the worker behaves as an entrepreneur in economic dealings ('ondernemerschap' — multiple " +
    "clients, own investment, VAT registration, professional liability insurance). Separately, the Wet DBA " +
    "(Wet Deregulering Beoordeling Arbeidsrelaties, 2016) governs how the Belastingdienst (tax authority) " +
    "assesses 'schijnzelfstandigheid' (false self-employment) for payroll-tax purposes; enforcement had been " +
    "suspended under a transitional moratorium but has been fully resumed as of 1 January 2025, meaning the " +
    "Belastingdienst can again issue additional tax assessments (naheffingsaanslagen) directly to clients.",

  keyRiskFactors: [
    "Client determines working hours, shifts, or requires the worker to be available at set times",
    "Worker is embedded ('ingebed') in the client's organization: company email, participation in team meetings, listed on internal org charts",
    "Client supplies the equipment, software, vehicle, or premises used to perform the work",
    "Worker performs the same kind of work as the client's own employees, alongside them, under the same supervision",
    "Worker has no genuine, exercised right to send a substitute (no reële vervangingsmogelijkheid)",
    "Little to no entrepreneurial risk: fixed periodic fee regardless of outcome, no own capital investment or chance of loss",
    "Worker depends economically on a single client, with no other active clients or independent market presence",
    "Continuous, ongoing relationship with no defined project scope or natural end date",
    "Pay is calculated per hour worked at a rate comparable to an internal salary scale, rather than per deliverable",
  ],

  redFlagClauses: [
    "Clauses fixing specific working hours or requiring the worker to follow the client's internal roster or timesheet system",
    "Clauses granting the client authority ('gezag') to issue instructions on how, when, and where the work must be performed",
    "Clauses requiring personal performance with no right of substitution",
    "Clauses integrating the worker into the client's team structure: reporting lines, 'leidinggevende' (supervisor), internal reviews",
    "Clauses obligating exclusive use of client-supplied equipment, software, or premises",
    "Exclusivity clauses preventing the worker from taking on other clients",
    "Termination clauses mirroring employee dismissal procedures rather than ordinary contractual notice",
    "Fixed monthly or hourly fee unrelated to deliverables, invoiced on a schedule resembling payroll",
    "Clauses requiring advance approval for absence or holidays, similar to an employee's leave request",
  ],

  positiveIndicators: [
    "Worker freely determines their own working hours and method of work, subject only to an agreed deliverable",
    "Worker simultaneously serves multiple clients and can show genuine entrepreneurial activity (own website, marketing, KvK registration)",
    "Worker uses their own equipment, tools, and premises, bearing real business costs and risk",
    "Compensation is tied to deliverables or milestones rather than hours worked, invoiced with VAT under the worker's own business",
    "Worker has a genuine, exercised right to decline assignments or delegate work to others",
    "No embeddedness in the client's organization: no company email domain, no supervisor, not part of internal team structures",
    "Contract has a defined scope and end date tied to a specific project rather than an indefinite ongoing engagement",
    "Worker bears real economic risk, with the possibility of profit or loss depending on how efficiently the work is done",
  ],

  consequencesOfMisclassification:
    "If the relationship is reclassified as an 'arbeidsovereenkomst', the client becomes the deemed employer " +
    "and is liable for retroactive payroll tax withholding (loonbelasting) and employee social-insurance " +
    "premiums (werknemersverzekeringen covering unemployment, incapacity, and sickness), which the " +
    "Belastingdienst can now again assess directly via a naheffingsaanslag, with statutory interest and " +
    "penalties for negligent or willful non-compliance. On the employment-law side, the worker can claim, " +
    "before the kantonrechter, statutory minimum wage and holiday allowance (vakantiebijslag, minimum 8% of " +
    "pay) under the Wet minimumloon en minimumvakantiebijslag, continued pay during illness for up to two " +
    "years (loondoorbetaling bij ziekte, Art. 7:629 BW), retroactive enrollment and back-contributions to a " +
    "mandatory sector pension fund where a 'verplichtstelling bedrijfstakpensioenfonds' applies, and " +
    "dismissal-protection remedies (payment in lieu of proper termination, transitievergoeding) if the " +
    "relationship is ended without following the statutory procedure.",

  relevantLaw:
    "Burgerlijk Wetboek (BW), Boek 7, Art. 7:610 (arbeidsovereenkomst) en Art. 7:629 (loondoorbetaling bij " +
    "ziekte). Wet DBA (Wet Deregulering Beoordeling Arbeidsrelaties). Wet op de loonbelasting 1964. Wet " +
    "minimumloon en minimumvakantiebijslag. HR 24 maart 2023, ECLI:NL:HR:2023:443 (Deliveroo). HR 6 " +
    "november 2020, ECLI:NL:HR:2020:1746 (X/Gemeente Amsterdam — holistische weging).",

  enforcementBodies: [
    "Belastingdienst (Dutch Tax and Customs Administration) — loonbelasting en schijnzelfstandigheid",
    "UWV (Uitvoeringsinstituut Werknemersverzekeringen) — sociale verzekeringen",
    "Nederlandse Arbeidsinspectie — minimumloon en arbeidsomstandigheden",
    "Kantonrechter / Hoge Raad — civielrechtelijke geschillen over de kwalificatie van de arbeidsrelatie",
  ],
};
