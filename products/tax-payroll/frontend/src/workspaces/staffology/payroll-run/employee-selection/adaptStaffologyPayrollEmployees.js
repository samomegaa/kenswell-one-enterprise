import {
  resolvePayrollEmployeeCollection,
  resolvePayrollEmployeeField,
} from './employeeSelectionResolver';

function resolveDisplayName(employee) {
  const explicit =
    resolvePayrollEmployeeField(employee, 'displayName');

  if (explicit) return String(explicit);

  const parts = [
    resolvePayrollEmployeeField(employee, 'firstName'),
    resolvePayrollEmployeeField(employee, 'lastName'),
  ].filter(Boolean);

  return parts.join(' ') || 'Unnamed employee';
}

function adaptEmployee(employee, index) {
  const id =
    resolvePayrollEmployeeField(employee, 'id') ||
    `payroll-employee-${index + 1}`;

  return {
    id: String(id),
    displayName: resolveDisplayName(employee),
    reference:
      resolvePayrollEmployeeField(employee, 'reference'),
    status:
      resolvePayrollEmployeeField(employee, 'status'),
    included:
      resolvePayrollEmployeeField(employee, 'included'),
    source: employee,
  };
}

export function adaptStaffologyPayrollEmployees(employer) {
  const collection =
    resolvePayrollEmployeeCollection(employer);

  return {
    available: collection.available,
    source: collection.source,
    employees: collection.items.map(adaptEmployee),
  };
}
