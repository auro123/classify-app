import type { Jurisdiction } from "./types";

export const france: Jurisdiction = {
  slug: "france",
  name: "France",

  legalTest: "Faisceau d'indices de subordination juridique",

  legalTestDetail:
    "French law has no statutory definition of 'contrat de travail' — whether a relationship is genuinely " +
    "an independent contractor arrangement (prestation de services) or a disguised employment relationship " +
    "('salariat déguisé') is determined by case law using a 'faisceau d'indices' (bundle of indicia) test. " +
    "The controlling standard comes from the Cour de cassation's landmark Société Générale ruling " +
    "(Cass. soc., 13 novembre 1996, n°94-13.187): legal subordination ('lien de subordination juridique " +
    "permanente') exists when the principal (a) gives orders and directives about how the work is to be " +
    "performed (not just what the deliverable is), (b) controls and supervises the contractor's execution of " +
    "that work, and (c) has the power to sanction the contractor for breaches. No single factor is decisive — " +
    "courts and URSSAF weigh the totality of the relationship as it operates in practice, regardless of how " +
    "the contract is labeled ('le contrat de travail est un contrat de fait' — form does not control over " +
    "reality). Since the Take Eat Easy (Cass. soc., 28 nov. 2018, n°17-20.079) and Uber (Cass. soc., 4 mars " +
    "2020, n°19-13.316) rulings, the test has also been applied to platform work: integration into an " +
    "organized service with unilaterally-imposed conditions, geolocation tracking, and a power to deactivate " +
    "the worker were treated as strong indicators of subordination.",

  keyRiskFactors: [
    "Client imposes fixed working hours, a set schedule, or requires the contractor to be reachable/available during specific hours",
    "Exclusivity, or a de facto single-client relationship creating economic dependency on one principal",
    "Contractor is integrated into the client's organizational structure: company email address, badge, seat on the org chart, invitations to internal staff meetings",
    "Client provides the equipment, software licenses, or workspace used to perform the work",
    "Client dictates the detailed method and process of the work, not just the expected result/deliverable",
    "Client holds disciplinary power: written warnings, performance reviews, or ability to terminate for 'misconduct' rather than simple breach of contract",
    "Contractor has no genuine, exercised right to subcontract or send a substitute to perform the work",
    "Contractor must request prior authorization for absences or holidays, similar to an employee's leave request",
    "Long-running, continuous relationship with no natural project end date, billed at a stable monthly amount resembling a salary",
    "Compensation calculated by time worked (daily/hourly rate resembling a payslip) rather than by deliverable or milestone",
  ],

  redFlagClauses: [
    "Clauses fixing precise daily/weekly working hours or requiring the contractor to follow the client's internal schedule or timesheet system",
    "Exclusivity clauses prohibiting the contractor from working for other clients during the contract term",
    "Clauses granting the client authority to issue 'instructions', 'directives', or disciplinary warnings to the contractor",
    "Clauses requiring the contractor to personally perform the services with no right of substitution or subcontracting",
    "Clauses requiring the contractor to request approval before taking time off or to notify the client of absences in advance like an employee would",
    "Clauses referring to the contractor's 'poste' (position/post), 'manager', 'hiérarchie', or placing them within the client's reporting line",
    "Clauses obligating the contractor to use only equipment, tools, systems, or premises supplied by the client",
    "Termination clauses that mirror disciplinary/dismissal procedures (mise à pied, avertissement) rather than contractual breach and notice",
    "Non-compete or non-solicitation clauses disproportionate to a genuine B2B relationship, without any financial compensation (contrary to Code du travail Art. L1121-1 principles on freedom to work)",
    "Fixed monthly fee unrelated to actual deliverables, paid on the same schedule as payroll (assimilation to a salary)",
  ],

  positiveIndicators: [
    "Contractor freely sets their own working hours and determines how the work gets done",
    "Contractor simultaneously works for multiple clients and can be shown to actively market their services",
    "Contractor uses their own equipment, tools, and premises, and bears their own business expenses and risk (e.g. professional indemnity insurance)",
    "Compensation is tied to deliverables, milestones, or results rather than time spent, and is invoiced (facture) with the contractor's own SIRET/SIREN",
    "Contractor has a genuine, usable right to delegate or subcontract the work to a third party",
    "No integration into the client's hierarchy: no company email domain, no line manager, not listed on the internal org chart",
    "Contract has a defined scope and end date tied to a specific project or deliverable, not an indefinite ongoing engagement",
    "Contractor bears the economic risk of the engagement (e.g. no fee for non-delivery, potential for profit or loss)",
  ],

  consequencesOfMisclassification:
    "If URSSAF or a court reclassifies the relationship ('requalification en contrat de travail'), the " +
    "principal becomes liable, retroactively, for the employer's and employee's share of social security " +
    "contributions on all sums paid, plus late-payment penalties ('majorations de retard') — typically over a " +
    "3-year lookback (5 years where 'travail dissimulé' / undeclared work is found under Code du travail Art. " +
    "L8221-5). Concealing an employment relationship this way also exposes the principal to criminal liability " +
    "for travail dissimulé (Art. L8224-1): up to 3 years' imprisonment and a €45,000 fine for individuals, " +
    "rising to €225,000 for a corporate entity (Art. L8224-5), plus mandatory publication of the conviction and " +
    "possible exclusion from public contracts. The reclassified worker can separately bring a claim before the " +
    "Conseil de Prud'hommes for unpaid overtime, paid leave (congés payés), 13th-month or other benefits under " +
    "the applicable collective bargaining agreement, wrongful dismissal indemnities if the relationship is " +
    "ended, and — where travail dissimulé is established — a lump-sum indemnity of six months' salary under " +
    "Art. L8223-1, on top of ordinary severance.",

  relevantLaw:
    "Code du travail: Art. L1221-1 (contrat de travail — jurisprudential definition via subordination), " +
    "Art. L8221-6 (rebuttable presumption of non-salaried status for workers registered as self-employed, " +
    "e.g. auto-entrepreneurs — displaced on proof of a permanent legal subordination relationship), " +
    "Art. L8221-6-1 (extends the presumption analysis to platform workers), Art. L8221-3 and L8221-5 " +
    "(travail dissimulé — dissimulation of activity / of salaried employment), Art. L8224-1 and L8224-5 " +
    "(criminal penalties for travail dissimulé), Art. L8223-1 (forfeit indemnity for the misclassified " +
    "worker). Foundational case law: Cass. soc., 13 nov. 1996, n°94-13.187 (Société Générale — defines legal " +
    "subordination); Cass. soc., 28 nov. 2018, n°17-20.079 (Take Eat Easy); Cass. soc., 4 mars 2020, " +
    "n°19-13.316 (Uber).",

  enforcementBodies: [
    "URSSAF (Union de recouvrement des cotisations de sécurité sociale et d'allocations familiales)",
    "Inspection du travail / DREETS (Direction régionale de l'économie, de l'emploi, du travail et des solidarités)",
    "Conseil de Prud'hommes (labor court, for individual reclassification and pay claims)",
    "Tribunal correctionnel (criminal court, for travail dissimulé prosecutions)",
  ],
};
