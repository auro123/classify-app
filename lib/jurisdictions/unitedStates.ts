import type { Jurisdiction } from "./types";

export const unitedStates: Jurisdiction = {
  slug: "unitedStates",
  name: "United States",

  legalTest: "Overlapping tests: IRS common-law control, FLSA economic realities, and state ABC tests",

  legalTestDetail:
    "US worker classification is fragmented across several independent legal regimes, each with its own " +
    "test, so a single worker can be a contractor under one regime and an employee under another. (1) For " +
    "federal tax purposes, the IRS applies a common-law 'right to control' test, organized around three " +
    "categories described in Rev. Rul. 87-41's 20-factor guide: behavioral control (does the business " +
    "control, or have the right to control, what the worker does and how), financial control (business " +
    "aspects of the job controlled by the payer — investment, unreimbursed expenses, opportunity for profit " +
    "or loss), and the type of relationship (written contracts, benefits, permanency, whether the work is a " +
    "key aspect of the business). (2) For federal wage-and-hour purposes, the Fair Labor Standards Act " +
    "(FLSA) uses an 'economic realities' test asking whether the worker is, as a matter of economic reality, " +
    "dependent on the business for work or is genuinely in business for themself — the Department of " +
    "Labor's 2024 final rule (29 CFR Part 795) restored a totality-of-circumstances version of this test, " +
    "weighing opportunity for profit or loss, investments by the worker and the employer, permanence of the " +
    "relationship, degree of control, whether the work is integral to the employer's business, and skill and " +
    "initiative. (3) Many states impose a stricter 'ABC test' for state wage, unemployment-insurance, or " +
    "workers'-compensation purposes — and in California, for most Labor Code purposes generally — presuming " +
    "a worker is an employee unless the hiring entity proves all three: (A) the worker is free from control " +
    "and direction in performing the work, (B) the work is outside the usual course of the hiring entity's " +
    "business, and (C) the worker is customarily engaged in an independently established trade or occupation " +
    "of the same nature. California's Dynamex Operations West, Inc. v. Superior Court, 4 Cal. 5th 903 (2018) " +
    "established this test, which was then codified by Assembly Bill 5 (2019) at Cal. Lab. Code § 2775, with " +
    "Proposition 22 (2020) subsequently carving out app-based rideshare and delivery drivers into a separate " +
    "category with limited benefits.",

  keyRiskFactors: [
    "Client controls the manner and means of the work (behavioral control), not just the end result",
    "Client sets fixed working hours, requires a set schedule, or dictates when and where the work is performed",
    "Contractor works exclusively or almost exclusively for one client, creating economic dependence",
    "Client supplies the equipment, software, training, or premises used to perform the work",
    "The work performed is integral to the client's core business rather than a discrete, ancillary project",
    "Contractor has no meaningful opportunity for profit or loss, or ability to hire their own helpers/subcontract the work",
    "Ongoing, indefinite relationship with no defined project scope or natural end date, paid on a schedule resembling payroll",
    "Client requires exclusive use of company-branded materials, uniforms, or communications",
    "Client exercises disciplinary control: warnings, performance reviews, or termination for 'conduct' rather than contractual breach",
  ],

  redFlagClauses: [
    "Clauses fixing specific working hours or requiring adherence to the client's internal schedule or timesheet system",
    "Clauses granting the client authority to direct and supervise the manner and means of the work, not just the deliverable",
    "Exclusivity clauses prohibiting the contractor from working for other clients or competitors",
    "Clauses requiring personal performance with no right to subcontract or hire assistants",
    "Clauses integrating the contractor into internal reporting lines, requiring attendance at staff meetings, or use of a company title",
    "Clauses obligating exclusive use of client-supplied equipment, software, uniforms, or premises",
    "Termination clauses mirroring employee at-will dismissal or disciplinary procedures rather than contractual breach and notice",
    "Fixed periodic fee unrelated to deliverables, paid on a biweekly/semi-monthly schedule resembling payroll",
    "Non-compete or exclusivity obligations disproportionate to a genuine independent-contractor relationship",
  ],

  positiveIndicators: [
    "Contractor controls the manner and means of performing the work, subject only to an agreed deliverable",
    "Contractor simultaneously serves multiple clients and actively markets their services to the public",
    "Contractor uses their own equipment, tools, and premises, and bears real business expenses and risk",
    "Compensation is tied to deliverables or a fixed project fee rather than hours worked, invoiced under the contractor's own business entity",
    "Contractor has a genuine, exercised right to hire assistants or subcontract portions of the work",
    "No integration into the client's organization: no company email domain, no supervisor, not listed on internal org charts",
    "Contract has a defined scope and end date tied to a specific project rather than an indefinite ongoing engagement",
    "The work performed is outside the client's usual line of business, not a core function performed by its own employees",
  ],

  consequencesOfMisclassification:
    "On the federal tax side, misclassification exposes the business to back employment taxes (FICA and " +
    "FUTA) under IRC §§ 3401-3510, with penalties for failure to withhold and file correct information " +
    "returns, though limited relief may be available under the Section 530 safe harbor for a business that " +
    "relied in good faith on a reasonable basis (such as long-standing industry practice) for treating the " +
    "worker as a contractor. Under the FLSA, misclassified workers can recover up to 2 years of unpaid " +
    "overtime and minimum-wage shortfalls (3 years for willful violations) under 29 U.S.C. § 255, plus " +
    "liquidated damages equal to the unpaid wages (effectively doubling the award) and the worker's " +
    "attorneys' fees under 29 U.S.C. § 216(b). At the state level, jurisdictions applying an ABC test (e.g. " +
    "California) can impose Labor Code civil penalties — including representative-action penalties under the " +
    "Private Attorneys General Act (PAGA) — assess unpaid state unemployment and disability insurance " +
    "contributions plus interest and penalties, and expose the business to workers'-compensation liability " +
    "for any workplace injury that occurred during the misclassified period. Because a single contractor " +
    "agreement template is often used for many similarly-situated workers, misclassification frequently " +
    "gives rise to class or collective actions rather than a single individual's claim.",

  relevantLaw:
    "Fair Labor Standards Act (FLSA), 29 U.S.C. § 203(g), § 213, § 255, § 216(b); 29 CFR Part 795 (U.S. " +
    "Department of Labor's 2024 independent contractor classification final rule). Internal Revenue Code, " +
    "common-law control test per IRS Rev. Rul. 87-41; IRC §§ 3401-3510 (employment tax liability) and the " +
    "Section 530 safe harbor (Revenue Act of 1978, as amended). National Labor Relations Act (NLRA) " +
    "common-law agency test for organizing rights. California Labor Code § 2775 et seq. (ABC test per " +
    "Assembly Bill 5) and Business & Professions Code § 7448 et seq. (Proposition 22, app-based drivers). " +
    "Dynamex Operations West, Inc. v. Superior Court, 4 Cal. 5th 903 (2018). Other states apply their own " +
    "ABC tests for unemployment/wage purposes (e.g. Massachusetts G.L. c. 149, § 148B; New Jersey N.J.S.A. " +
    "43:21-19(i)(6)).",

  enforcementBodies: [
    "U.S. Department of Labor, Wage and Hour Division (WHD) — FLSA enforcement",
    "Internal Revenue Service (IRS) — employment-tax enforcement and SS-8 worker-status determinations",
    "National Labor Relations Board (NLRB) — organizing-rights classification disputes",
    "State labor departments and unemployment insurance agencies (e.g. California EDD, Labor Commissioner's Office); state Attorneys General",
  ],
};
