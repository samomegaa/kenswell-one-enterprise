export const ORGANISATION_FIELDS = Object.freeze({
  id: ['id', 'externalEmployerId', 'employerId'],
  name: ['name', 'employerName', 'businessName', 'displayName'],
  reference: ['reference', 'employerReference', 'payrollReference'],
  payrollName: ['payrollName', 'payroll.name'],
  payFrequency: ['payFrequency', 'payrollFrequency', 'frequency'],
  currency: ['currency', 'payroll.currency'],
  country: ['country', 'countryCode', 'jurisdiction'],
  taxOffice: ['taxOffice', 'taxOfficeReference', 'accountsOfficeReference'],
  currentTaxYear: ['currentTaxYear', 'startTaxYear', 'taxYear'],
  status: ['status', 'processingStatus', 'state'],
  connectedSince: ['connectedSince', 'linkedAt', 'createdAt'],
});
