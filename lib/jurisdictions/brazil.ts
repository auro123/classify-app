import type { Jurisdiction } from "./types";

export const brazil: Jurisdiction = {
  slug: "brazil",
  name: "Brazil",

  legalTest: "Requisitos do vínculo empregatício (CLT, Art. 3º) e risco de 'pejotização'",

  legalTestDetail:
    "Brazilian labor law (Consolidação das Leis do Trabalho — CLT, Art. 3º) defines an 'empregado' as a " +
    "natural person who renders services with (1) pessoalidade (the work must be performed personally, by " +
    "that individual, not delegable), (2) não-eventualidade (non-sporadic, habitual/continuous provision of " +
    "services), (3) onerosidade (paid), and (4) subordinação (subordination — the worker follows the " +
    "employer's directives on how, when, and where the work is done). Courts (Justiça do Trabalho) look past " +
    "the contractual label to the facts of how the relationship actually operates (primazia da realidade), " +
    "and Art. 9º CLT voids any act intended to defraud these protections. 'Pejotização' refers to the " +
    "widespread practice of requiring a worker to incorporate as a 'PJ' (pessoa jurídica, typically an MEI or " +
    "ME) and invoice for services under a civil/commercial services contract, in order to avoid CLT " +
    "obligations, even though the underlying relationship still exhibits pessoalidade, habitualidade, and " +
    "subordinação. The 2017 Reforma Trabalhista (Lei 13.467/2017) added Art. 442-B, which allows engaging a " +
    "genuinely autonomous worker (including one who was formerly an employee) without automatic " +
    "characterization as an employment relationship — but only where the engagement is factually autonomous; " +
    "it does not immunize a relationship that in practice satisfies the Art. 3º elements. Lei 13.429/2017 and " +
    "Lei 13.467/2017 also broadened lawful outsourcing (terceirização) to core business activities " +
    "('atividade-fim'), upheld by the Supremo Tribunal Federal in ADPF 324 and RE 958.252 (Rel. Min. Luiz " +
    "Fux, 2018) — but that ruling addresses outsourcing between companies, not whether a specific individual " +
    "is, in fact, subordinated to whoever directs their day-to-day work.",

  keyRiskFactors: [
    "Contractor (PJ) must render services personally, with no genuine ability to send a substitute or hire helpers",
    "Ongoing, habitual relationship with no defined end date, resembling a continuous job rather than a discrete project",
    "Client sets fixed working hours, requires a time clock/timesheet, or tracks attendance similarly to employees",
    "Contractor works exclusively or almost exclusively for one client, with no other active clients",
    "Client provides equipment, uniforms, company email, or workspace and integrates the contractor into internal teams/org charts",
    "Client directs how the work is performed on a day-to-day basis, not just the expected deliverable",
    "Client exercises disciplinary power: warnings, performance write-ups, or termination for 'misconduct'",
    "Fixed monthly invoice amount resembling a salary, paid on the same schedule as payroll",
    "Contractor was previously an employee of the same client and now performs the same functions as a 'PJ'",
    "Contractor must request prior approval for absences or vacations, similar to an employee's leave request",
  ],

  redFlagClauses: [
    "Clauses requiring personal performance with no right of substitution or ability to subcontract the work",
    "Clauses fixing specific daily/weekly hours or requiring adherence to the client's internal schedule or point de contrôle",
    "Exclusivity clauses prohibiting the PJ from providing services to other clients",
    "Clauses subjecting the contractor to the client's internal policies, codes of conduct, or disciplinary procedures as if an employee",
    "Clauses referring to a 'cargo' (position), 'gestor'/'superior hierárquico' (manager/supervisor), or placing the contractor within the client's reporting line",
    "Clauses obligating exclusive use of client-supplied equipment, systems, uniforms, or premises",
    "Termination clauses mirroring employee dismissal procedures rather than contractual breach and notice",
    "Non-compete clauses disproportionate to a genuine B2B relationship with no separate compensation",
    "Fixed monthly fee unrelated to actual deliverables or hours actually invoiced, paid like a salary",
    "Clauses requiring advance notice/approval for the contractor's absences, similar to employee leave requests",
  ],

  positiveIndicators: [
    "Contractor freely determines their own working hours and method of work, subject only to agreed deliverables",
    "Contractor simultaneously provides services to multiple clients and can demonstrate active market activity",
    "Contractor uses their own equipment, tools, and premises, and bears their own business expenses and risk",
    "Compensation is tied to deliverables or defined scope of work and is invoiced (nota fiscal) under the contractor's own CNPJ",
    "Contractor has a genuine, exercised right to delegate work to employees or subcontractors of their own PJ",
    "No integration into the client's organizational hierarchy: no company email domain, no internal manager, not listed on internal org charts",
    "Contract has a defined scope and end date tied to a specific project or deliverable rather than an indefinite ongoing engagement",
    "Contractor bears real economic risk of the engagement, with potential for profit or loss on the contract",
  ],

  consequencesOfMisclassification:
    "If the Justiça do Trabalho recognizes an employment relationship ('reconhecimento de vínculo " +
    "empregatício'), the client becomes retroactively liable for all CLT entitlements the worker would have " +
    "accrued as an employee: FGTS deposits (8% of remuneration) plus the 40% termination fine, 13º salário " +
    "(annual bonus), férias with the constitutional 1/3 bonus, unpaid overtime and its 50%+ premium, and " +
    "INSS social-security contributions (both employer and employee shares, subject to a 5-year limitation " +
    "period under Art. 7, XXIX of the Constitution). The employer also faces its own back INSS contributions " +
    "assessed by the Receita Federal, late-payment fines and interest, and potential administrative " +
    "penalties from Auditores-Fiscais do Trabalho for irregular registration (falta de registro em CTPS, " +
    "Art. 47 CLT). The Ministério Público do Trabalho (MPT) can additionally pursue an ação civil pública " +
    "against companies engaged in systematic pejotização, seeking company-wide reclassification and moral " +
    "collective damages, not just relief for a single worker.",

  relevantLaw:
    "CLT (Consolidação das Leis do Trabalho): Art. 2º e 3º (definição de empregador e empregado), Art. 9º " +
    "(nulidade de atos que visem desvirtuar a relação de emprego), Art. 442-B (trabalho autônomo, incluído " +
    "pela Lei 13.467/2017), Art. 47 (multa por ausência de registro). Lei 13.429/2017 e Lei 13.467/2017 " +
    "(Reforma Trabalhista — terceirização lícita da atividade-fim). Constituição Federal, Art. 7º, XXIX " +
    "(prescrição quinquenal de créditos trabalhistas). STF, ADPF 324 e RE 958.252, Rel. Min. Luiz Fux (2018) " +
    "— licitude da terceirização de atividade-fim, sem prejuízo do reconhecimento de vínculo quando " +
    "presentes os requisitos do Art. 3º CLT no caso concreto. TST, Súmula 331 (responsabilidade em cadeias " +
    "de terceirização).",

  enforcementBodies: [
    "Ministério do Trabalho e Emprego (MTE) / Auditoria-Fiscal do Trabalho",
    "Justiça do Trabalho (Varas do Trabalho, Tribunais Regionais do Trabalho — TRTs, e Tribunal Superior do Trabalho — TST)",
    "Ministério Público do Trabalho (MPT)",
    "Receita Federal do Brasil (contribuições previdenciárias — INSS)",
  ],
};
