import { firstValue, resolveCollection } from '../organisationCollectionResolver';
import { DEPARTMENT_COLLECTION_PATHS, DEPARTMENT_FIELDS } from './departmentFields';

export function resolveDepartments(source) {
  return resolveCollection(source, DEPARTMENT_COLLECTION_PATHS);
}

export function resolveDepartmentField(source, field) {
  return firstValue(source, DEPARTMENT_FIELDS[field] || []);
}
