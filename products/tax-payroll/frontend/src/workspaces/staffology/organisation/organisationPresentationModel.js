import { presentOrganisationDate, presentOrganisationValue } from './organisationPresentation';
const fields = (entries) => entries.map(([label, value]) => ({ label, value: presentOrganisationValue(value) }));
export function createOrganisationPresentationModel(model) {
  const v = model?.values || {};
  return {
    available: Boolean(model?.available),
    title: presentOrganisationValue(v.name),
    reference: presentOrganisationValue(v.reference),
    identity: fields([['Employer ID', v.id], ['Employer reference', v.reference], ['Provider', v.provider], ['Current tax year', v.currentTaxYear]]),
    payroll: fields([['Payroll name', v.payrollName], ['Pay frequency', v.payFrequency], ['Currency', v.currency], ['Country', v.country]]),
    administration: fields([['Tax office', v.taxOffice], ['Processing status', v.status], ['Connected since', presentOrganisationDate(v.connectedSince)]]),
  };
}
