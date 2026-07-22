import { ORGANISATION_FIELDS } from './organisationFields';
function readPath(source, path) { return path.split('.').reduce((value, key) => value?.[key], source); }
export function firstOrganisationValue(source, field) {
  for (const path of ORGANISATION_FIELDS[field] || []) {
    const value = readPath(source, path);
    if (value !== undefined && value !== null && value !== '') return value;
  }
  return null;
}
export function resolveOrganisationSource(input) {
  return input?.employer || input?.organisation || input?.organization || input || null;
}
