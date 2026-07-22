import { resolveDepartmentField, resolveDepartments } from './departmentResolver';

function adaptDepartment(item, index) {
  return {
    id: resolveDepartmentField(item, 'id') || `department-${index + 1}`,
    name: resolveDepartmentField(item, 'name'),
    reference: resolveDepartmentField(item, 'reference'),
    manager: resolveDepartmentField(item, 'manager'),
    parent: resolveDepartmentField(item, 'parent'),
    costCentre: resolveDepartmentField(item, 'costCentre'),
    payrollGroup: resolveDepartmentField(item, 'payrollGroup'),
    employeeCount: resolveDepartmentField(item, 'employeeCount'),
    status: resolveDepartmentField(item, 'status'),
  };
}

export function adaptStaffologyDepartments(input) {
  const source = input?.employer || input?.organisation || input?.organization || input || {};
  const collection = resolveDepartments(source);
  return { available: collection.available, sourcePath: collection.sourcePath, items: collection.items.map(adaptDepartment) };
}
