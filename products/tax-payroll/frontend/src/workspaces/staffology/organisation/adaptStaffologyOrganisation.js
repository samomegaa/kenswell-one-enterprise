import { firstOrganisationValue, resolveOrganisationSource } from './organisationResolver';
export function adaptStaffologyOrganisation(input) {
  const source = resolveOrganisationSource(input);
  if (!source || typeof source !== 'object') return { available: false, values: {} };
  const values = {
    id: firstOrganisationValue(source, 'id'),
    name: firstOrganisationValue(source, 'name'),
    reference: firstOrganisationValue(source, 'reference'),
    payrollName: firstOrganisationValue(source, 'payrollName'),
    payFrequency: firstOrganisationValue(source, 'payFrequency'),
    currency: firstOrganisationValue(source, 'currency'),
    country: firstOrganisationValue(source, 'country'),
    taxOffice: firstOrganisationValue(source, 'taxOffice'),
    currentTaxYear: firstOrganisationValue(source, 'currentTaxYear'),
    status: firstOrganisationValue(source, 'status'),
    connectedSince: firstOrganisationValue(source, 'connectedSince'),
    provider: 'Staffology',
  };
  return { available: Boolean(values.id || values.name), values };
}
