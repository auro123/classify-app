import type { Jurisdiction } from "./types";

export const spain: Jurisdiction = {
  slug: "spain",
  name: "Spain",

  legalTest: "Presunción de laboralidad (Art. 8.1 ET) — notas de dependencia y ajenidad; 'Ley Rider'",

  legalTestDetail:
    "The Spanish Workers' Statute (Estatuto de los Trabajadores, Real Decreto Legislativo 2/2015, ET) " +
    "defines an employment relationship in Art. 1.1 as the voluntary provision of services within the scope " +
    "of the organization and direction ('ámbito de organización y dirección') of another person, in " +
    "exchange for pay. Art. 8.1 ET establishes a rebuttable legal presumption ('presunción de laboralidad') " +
    "that any relationship between a person who provides a paid service and a person who receives and " +
    "organizes it is an employment contract. The Tribunal Supremo (Sala de lo Social) assesses this through " +
    "the classic notes of 'dependencia' (subjection to the client's organizational and directive sphere) and " +
    "'ajenidad' (the fruits, risks, and means of the work belong to another — ajenidad en los frutos, en los " +
    "riesgos, y en los medios) to distinguish genuine employment from self-employment ('trabajador " +
    "autónomo', regulated by the Estatuto del Trabajo Autónomo, Ley 20/2007) or the hybrid 'TRADE' category " +
    "(trabajador autónomo económicamente dependiente — a self-employed person earning 75%+ of their income " +
    "from one client, who receives some but not full employee protections under Ley 20/2007). Spain enacted " +
    "the world's first statutory presumption specifically for platform work — Real Decreto-ley 9/2021, known " +
    "as the 'Ley Rider' — creating a presumption of laboralidad for delivery riders whose work is organized " +
    "through algorithmic management, following the Tribunal Supremo's Glovo ruling (STS 805/2020, 25 " +
    "septiembre 2020, rec. 4746/2019), which held that a Glovo rider was an employee rather than a genuine " +
    "autónomo because Glovo, not the rider, controlled the price, the assignment of orders, and the " +
    "performance evaluation via its algorithm.",

  keyRiskFactors: [
    "Client organizes and directs the work through fixed shifts, mandatory schedules, or app-based assignment of tasks",
    "Contractor's pricing, order assignment, or performance is controlled by the client's algorithm or internal system rather than the contractor",
    "Contractor is economically dependent on a single client (75%+ of income) without being registered as a TRADE",
    "Client supplies the equipment, vehicle, uniform, or premises used to perform the work",
    "Contractor is integrated into the client's organization: company email, participation in internal meetings, place in the org chart",
    "Client exercises disciplinary power: warnings, deactivation, or termination for 'misconduct' rather than contractual breach",
    "Contractor has no genuine ability to reject assignments, set their own prices, or negotiate terms",
    "Fixed periodic fee unrelated to actual results, resembling a salary, invoiced on a schedule mirroring payroll",
  ],

  redFlagClauses: [
    "Clauses fixing shifts, schedules, or requiring adherence to the client's internal roster or app-based availability system",
    "Clauses granting the client control over pricing, order/task assignment, or performance scoring via an algorithm",
    "Exclusivity clauses prohibiting work for other clients without TRADE registration to match the economic reality",
    "Clauses requiring personal performance with no right of substitution",
    "Clauses referring to a 'responsable' or 'supervisor', or placing the contractor within the client's reporting line",
    "Clauses obligating exclusive use of client-supplied equipment, vehicles, uniforms, or apps",
    "Termination or deactivation clauses mirroring disciplinary dismissal rather than ordinary contractual breach and notice",
    "Fixed monthly or per-shift fee unrelated to actual deliverables, paid on a schedule resembling payroll",
  ],

  positiveIndicators: [
    "Contractor freely sets or negotiates their own prices and determines how the work is performed",
    "Contractor simultaneously serves multiple clients, or is properly registered as a TRADE with the corresponding contract filed with the SEPE",
    "Contractor uses their own equipment, vehicle, and premises, bearing real business expenses and risk",
    "Compensation is tied to deliverables or results, invoiced under the contractor's own alta de autónomo",
    "Contractor has a genuine, exercised right to reject assignments or delegate work to others",
    "No integration into the client's hierarchy: no company email domain, no supervisor, not part of internal team structures",
    "Contract has a defined scope and end date tied to a specific project rather than an indefinite ongoing engagement",
    "Contractor bears real economic risk, with potential for profit or loss depending on how the work is performed",
  ],

  consequencesOfMisclassification:
    "If a 'declaración de laboralidad' (recognition of employment status) is issued by a court, the client " +
    "becomes retroactively liable, as the actual employer, for both the employer's and worker's shares of " +
    "Social Security contributions for up to 4 years, plus surcharges ('recargos') for late payment. The " +
    "reclassified worker can claim back pay at the minimum salary set by the applicable convenio colectivo, " +
    "paid leave, extra statutory payments (pagas extraordinarias), and severance if the relationship is " +
    "terminated without following statutory dismissal procedure. The Inspección de Trabajo y Seguridad " +
    "Social (ITSS) can independently classify the conduct as a 'muy grave' infraction under the LISOS (Ley " +
    "de Infracciones y Sanciones en el Orden Social), carrying substantial administrative fines calculated " +
    "per affected worker, and can order immediate registration of the workers with the Tesorería General de " +
    "la Seguridad Social (TGSS). Large-scale or repeated concealment of employment relationships can " +
    "additionally constitute a labor-related criminal offense under Art. 311 of the Código Penal.",

  relevantLaw:
    "Estatuto de los Trabajadores (Real Decreto Legislativo 2/2015): Art. 1.1 (relación laboral), Art. 8.1 " +
    "(presunción de laboralidad). Ley 20/2007, Estatuto del Trabajo Autónomo (regula autónomos y TRADEs). " +
    "Real Decreto-ley 9/2021 ('Ley Rider' — presunción de laboralidad para repartidores sujetos a gestión " +
    "algorítmica, y modificación del Art. 64 ET sobre información de algoritmos a la representación de los " +
    "trabajadores). Ley General de la Seguridad Social (Real Decreto Legislativo 8/2015). Ley de " +
    "Infracciones y Sanciones en el Orden Social (LISOS). STS (Sala de lo Social) 805/2020, 25 septiembre " +
    "2020, rec. 4746/2019 (Glovo).",

  enforcementBodies: [
    "Inspección de Trabajo y Seguridad Social (ITSS)",
    "Tesorería General de la Seguridad Social (TGSS)",
    "Juzgados de lo Social",
    "Tribunal Supremo, Sala de lo Social",
  ],
};
