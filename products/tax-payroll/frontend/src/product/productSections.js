export const PRODUCT_SECTION_IDS = Object.freeze({
  DASHBOARD: 'dashboard',
  PAYROLL: 'payroll',
  RTI: 'rti',
  EMPLOYEES: 'employees',
  HMRC: 'hmrc',
  PENSIONS: 'pensions',
  REPORTS: 'reports',
  ORGANISATION: 'organisation',
});

export const PRODUCT_SECTIONS = Object.freeze([
  { id: PRODUCT_SECTION_IDS.DASHBOARD, label: 'Dashboard', order: 10 },
  { id: PRODUCT_SECTION_IDS.PAYROLL, label: 'Payroll', order: 20 },
  { id: PRODUCT_SECTION_IDS.RTI, label: 'RTI', order: 30 },
  { id: PRODUCT_SECTION_IDS.EMPLOYEES, label: 'Employees', order: 40 },
  { id: PRODUCT_SECTION_IDS.HMRC, label: 'HMRC', order: 50 },
  { id: PRODUCT_SECTION_IDS.PENSIONS, label: 'Pensions', order: 60 },
  { id: PRODUCT_SECTION_IDS.REPORTS, label: 'Reports', order: 70 },
  { id: PRODUCT_SECTION_IDS.ORGANISATION, label: 'Organisation', order: 80 },
]);

export function getProductSection(sectionId) {
  return PRODUCT_SECTIONS.find((section) => section.id === sectionId) || null;
}
