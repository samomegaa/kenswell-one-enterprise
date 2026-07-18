'use strict';

const WORKSPACE_SECTION_IDS = Object.freeze({
  PERSONAL: 'personal',
  ADDRESS: 'address',
  EMPLOYMENT: 'employment',
  TAX_NI: 'tax-ni',
  PAY: 'pay',
  BANKING: 'banking',
  PENSION: 'pension',
  BENEFITS: 'benefits',
  LEAVE: 'leave',
  OPENING_BALANCES: 'opening-balances',
  RTI: 'rti',
  PROVIDER: 'provider',
});

const WORKSPACE_SECTIONS = Object.freeze([
  { id: WORKSPACE_SECTION_IDS.PERSONAL, title: 'Personal', order: 10, icon: 'user', description: 'Identity and contact information.', readiness: ['creation', 'payroll', 'rti'] },
  { id: WORKSPACE_SECTION_IDS.ADDRESS, title: 'Address', order: 20, icon: 'map-pin', description: 'Residential and correspondence details.', readiness: ['rti'] },
  { id: WORKSPACE_SECTION_IDS.EMPLOYMENT, title: 'Employment', order: 30, icon: 'briefcase', description: 'Employment, director and lifecycle details.', readiness: ['creation', 'payroll', 'rti'] },
  { id: WORKSPACE_SECTION_IDS.TAX_NI, title: 'Tax & NI', order: 40, icon: 'landmark', description: 'PAYE, National Insurance and loan settings.', readiness: ['payroll', 'rti'] },
  { id: WORKSPACE_SECTION_IDS.PAY, title: 'Pay', order: 50, icon: 'wallet', description: 'Pay schedule, basis and remuneration.', readiness: ['payroll'] },
  { id: WORKSPACE_SECTION_IDS.BANKING, title: 'Banking', order: 60, icon: 'building-2', description: 'Payment method and bank details.', readiness: ['payroll'] },
  { id: WORKSPACE_SECTION_IDS.PENSION, title: 'Pension', order: 70, icon: 'shield-check', description: 'Auto-enrolment and pension membership.', readiness: ['payroll'] },
  { id: WORKSPACE_SECTION_IDS.BENEFITS, title: 'Benefits & Deductions', order: 80, icon: 'badge-pound-sterling', description: 'Benefits, deductions and attachment orders.', readiness: ['payroll'] },
  { id: WORKSPACE_SECTION_IDS.LEAVE, title: 'Leave & Statutory Pay', order: 90, icon: 'calendar-days', description: 'Leave, absence and statutory payment details.', readiness: ['payroll', 'rti'] },
  { id: WORKSPACE_SECTION_IDS.OPENING_BALANCES, title: 'Opening Balances', order: 100, icon: 'scale', description: 'Year-to-date payroll balances.', readiness: ['payroll', 'rti'] },
  { id: WORKSPACE_SECTION_IDS.RTI, title: 'RTI', order: 110, icon: 'send', description: 'RTI readiness, flags and submission context.', readiness: ['rti'] },
  { id: WORKSPACE_SECTION_IDS.PROVIDER, title: 'Provider', order: 120, icon: 'plug', description: 'Provider references and synchronisation state.', readiness: [] },
]);

module.exports = { WORKSPACE_SECTION_IDS, WORKSPACE_SECTIONS };
