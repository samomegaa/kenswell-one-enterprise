import {
  defaultEmployeeIncluded,
  displayEmployeeValue,
  normaliseEmploymentStatus,
} from './employeeSelectionPresentation';

function presentEmployee(employee) {
  return {
    ...employee,
    referenceLabel:
      displayEmployeeValue(employee.reference),
    statusLabel:
      normaliseEmploymentStatus(employee.status),
    defaultSelected:
      defaultEmployeeIncluded(employee.included),
  };
}

export function createEmployeeSelectionPresentationModel(
  contract
) {
  const employees =
    contract.employees.map(presentEmployee);

  return {
    available: contract.available,
    source: contract.source,
    employees,
    totalCount: employees.length,
    activeCount: employees.filter(
      (employee) => employee.statusLabel === 'Active'
    ).length,
    inactiveCount: employees.filter(
      (employee) => employee.statusLabel === 'Inactive'
    ).length,
  };
}
