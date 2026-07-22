export const DEPARTMENT_COLLECTION_PATHS = Object.freeze([
  'departments', 'organisation.departments', 'organization.departments',
  'payroll.departments', 'settings.departments', 'metadata.departments',
]);

export const DEPARTMENT_FIELDS = Object.freeze({
  id: ['id', 'departmentId', 'externalId'],
  name: ['name', 'departmentName', 'displayName'],
  reference: ['reference', 'code', 'departmentCode'],
  manager: ['managerName', 'manager.name', 'manager'],
  parent: ['parentDepartmentName', 'parent.name', 'parentDepartment'],
  costCentre: ['costCentreName', 'costCentre.name', 'costCenter.name', 'costCentre', 'costCenter'],
  payrollGroup: ['payrollGroupName', 'payrollGroup.name', 'payrollGroup'],
  employeeCount: ['employeeCount', 'employeesCount', 'numberOfEmployees'],
  status: ['status', 'state', 'active'],
});
