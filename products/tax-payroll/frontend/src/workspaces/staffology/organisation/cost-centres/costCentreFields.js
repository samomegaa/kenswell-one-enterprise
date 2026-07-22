export const COST_CENTRE_COLLECTION_PATHS = Object.freeze([
  'costCentres', 'costCenters', 'organisation.costCentres', 'organization.costCenters',
  'payroll.costCentres', 'payroll.costCenters', 'settings.costCentres', 'settings.costCenters',
]);

export const COST_CENTRE_FIELDS = Object.freeze({
  id: ['id', 'costCentreId', 'costCenterId'],
  name: ['name', 'costCentreName', 'costCenterName'],
  reference: ['reference', 'code'],
  description: ['description', 'notes'],
  manager: ['managerName', 'manager.name', 'manager'],
  department: ['departmentName', 'department.name', 'department'],
  employeeCount: ['employeeCount', 'employeesCount', 'numberOfEmployees'],
  status: ['status', 'state', 'active'],
});
