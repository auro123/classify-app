import type { Jurisdiction } from "./types";

export const uk: Jurisdiction = {
  slug: "uk",
  name: "UK",

  legalTest: "Employment status tests (control, personal service, mutuality of obligation) and IR35",

  legalTestDetail:
    "UK law recognizes three overlapping categories relevant here: 'employee' (full statutory rights), " +
    "'worker' (an intermediate 'limb (b) worker' status under s.230(3)(b) Employment Rights Act 1996, which " +
    "carries rights such as the National Minimum Wage and paid holiday but not unfair-dismissal or " +
    "redundancy protection), and genuine self-employment. There is no single statutory test; courts and " +
    "tribunals apply a multi-factor analysis built up through case law. The foundational three-part test " +
    "from Ready Mixed Concrete (South East) Ltd v Minister of Pensions [1968] 2 QB 497 asks whether there is " +
    "(1) personal service (the individual agrees to provide their own work and skill), (2) mutuality of " +
    "obligation (an ongoing obligation for the engager to offer, and the individual to accept, work), and " +
    "(3) sufficient control by the engager over how the work is done. Market Investigations Ltd v Minister " +
    "of Social Security [1969] 2 QB 173 added the broader question of whether the person is genuinely 'in " +
    "business on their own account'. Courts will disregard contractual wording that does not reflect the " +
    "reality of the relationship (Autoclenz Ltd v Belcher [2011] UKSC 41), and the Supreme Court's Uber BV v " +
    "Aslam [2021] UKSC 5 confirmed that statutory worker status must be assessed by reference to the " +
    "practical reality of subordination and control (e.g. fixed fares set by Uber, performance monitoring, " +
    "and penalties for declining trips) rather than the label in the contract. Separately, for tax purposes, " +
    "the IR35 / off-payroll working rules (Chapter 8 ITEPA 2003 for smaller clients; Chapter 10, following " +
    "the 2021 reform, for medium/large private-sector and all public-sector clients) require an assessment " +
    "of whether, absent the intermediary (personal service company), the individual would be regarded as an " +
    "employee for tax purposes, applying a similar control/substitution/mutuality-of-obligation analysis.",

  keyRiskFactors: [
    "Client controls what, how, when, and where the work is done, beyond specifying the deliverable",
    "No genuine, exercised right of substitution — the individual must perform the work personally",
    "Mutuality of obligation: an ongoing expectation that the client will offer work and the individual will accept it",
    "Contractor is integrated into the client's organization: company email, participation in internal meetings, place in the org chart",
    "Client supplies the equipment, software, or premises used to perform the work",
    "Fixed working hours, mandatory shifts, or a schedule set unilaterally by the client",
    "Contractor works exclusively or almost exclusively for one client, with no other active clients or independent business presence",
    "No meaningful financial risk borne by the contractor: fixed fee regardless of outcome, no own investment, no chance of loss",
    "Client exercises disciplinary control: warnings, performance reviews, or termination for 'misconduct' rather than contractual breach",
  ],

  redFlagClauses: [
    "Clauses fixing specific working hours or requiring adherence to the client's internal roster or timesheet system",
    "Clauses requiring personal performance with no right of substitution, or a substitution right subject to the client's unfettered approval",
    "Clauses obligating the client to provide continuing work and the contractor to accept it (mutuality of obligation)",
    "Clauses granting the client authority to direct and supervise how the work is carried out, not just the end result",
    "Exclusivity clauses prohibiting the contractor from working for other clients during the engagement",
    "Clauses integrating the contractor into internal reporting lines, management structures, or disciplinary procedures",
    "Clauses obligating exclusive use of client-supplied equipment, systems, or premises",
    "Fixed periodic fee unrelated to deliverables, paid on a schedule resembling payroll",
    "Termination clauses mirroring employee dismissal procedures (notice, disciplinary process) rather than ordinary contractual breach",
  ],

  positiveIndicators: [
    "Contractor has a genuine, unfettered right to send a substitute to perform the work",
    "No mutuality of obligation: the client is not obliged to offer further work, and the contractor is free to decline",
    "Contractor freely determines their own working hours and method of work",
    "Contractor simultaneously serves multiple clients and can demonstrate genuine business activity (own equipment, marketing, business insurance)",
    "Contractor bears real financial risk: the possibility of profit or loss, and liability for rectifying defective work at their own cost",
    "Contractor uses their own equipment, tools, and premises rather than the client's",
    "Contract has a defined scope and end date tied to a specific project or deliverable",
    "No integration into the client's organization: no company email domain, no line manager, not listed on internal org charts",
  ],

  consequencesOfMisclassification:
    "On the tax side, if HMRC or a tribunal finds the engagement should have been treated as employment " +
    "under the IR35/off-payroll rules, the fee-payer (the client or agency, for medium/large private-sector " +
    "engagements since the 2021 reform) becomes liable for the unpaid PAYE income tax and employer's and " +
    "employee's National Insurance Contributions that should have been deducted, together with HMRC interest " +
    "and penalties — up to 30% of the tax owed for careless errors and up to 100% for deliberate " +
    "non-compliance — potentially going back 4 years for innocent errors, 6 years for careless ones, and " +
    "with no time limit for deliberate non-compliance. On the employment-rights side, an Employment Tribunal " +
    "finding of 'worker' or 'employee' status entitles the individual to claim back-dated National Minimum " +
    "or Living Wage, unlawful deductions from wages, and holiday pay — which, following Chief Constable of " +
    "the Police Service of Northern Ireland v Agnew [2019] NICA 32 (as applied by UK tribunals), can be " +
    "claimed for a substantial back period where deductions form a linked series. Where full 'employee' " +
    "status is found, the individual may also claim unfair dismissal and statutory redundancy pay if the " +
    "relevant qualifying periods and dismissal occurred.",

  relevantLaw:
    "Employment Rights Act 1996, s.230 (definitions of 'employee' and 'worker'). Income Tax (Earnings and " +
    "Pensions) Act 2003 (ITEPA 2003), Chapters 8 and 10 (IR35 / off-payroll working rules). Social Security " +
    "Contributions and Benefits Act 1992 (National Insurance Contributions status). Ready Mixed Concrete " +
    "(South East) Ltd v Minister of Pensions [1968] 2 QB 497. Market Investigations Ltd v Minister of Social " +
    "Security [1969] 2 QB 173. Autoclenz Ltd v Belcher [2011] UKSC 41. Uber BV v Aslam [2021] UKSC 5.",

  enforcementBodies: [
    "HM Revenue & Customs (HMRC) — IR35/off-payroll tax enforcement, National Insurance Contributions",
    "Employment Tribunal — worker/employee status and associated rights claims",
    "HMRC National Minimum Wage enforcement team",
    "Gangmasters and Labour Abuse Authority (GLAA) — licensed sectors",
  ],
};
