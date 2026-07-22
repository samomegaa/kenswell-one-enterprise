import {
  adaptStaffologyOrganisation,
} from '../adaptStaffologyOrganisation';

import {
  adaptStaffologyDepartments,
} from '../departments';

import {
  adaptStaffologyCostCentres,
} from '../cost-centres';

import {
  adaptStaffologyPayrollCalendar,
} from '../payroll-calendar';

import {
  adaptStaffologyPayElements,
} from '../pay-elements';

import {
  resolveDashboardEmployeeCount,
  resolveDashboardHealth,
  resolveDashboardSource,
  resolveDashboardStatus,
} from './dashboardResolver';

function metric(model) {
  return {
    available: Boolean(model.available),
    count: model.available ? model.items.length : null,
  };
}

export function adaptStaffologyOrganisationDashboard(input) {
  const source = resolveDashboardSource(input);
  const organisation = adaptStaffologyOrganisation(source);
  const departments = adaptStaffologyDepartments(source);
  const costCentres = adaptStaffologyCostCentres(source);
  const payrollCalendar =
    adaptStaffologyPayrollCalendar(source);
  const payElements = adaptStaffologyPayElements(source);

  const availableGroups = payElements.groups.filter(
    (group) => group.available
  );

  const unavailableContracts = [
    !departments.available && 'Departments',
    !costCentres.available && 'Cost centres',
    !payrollCalendar.available && 'Payroll calendar',
    ...payElements.groups
      .filter((group) => !group.available)
      .map((group) => group.title),
  ].filter(Boolean);

  return {
    available: organisation.available,
    organisation: organisation.values,
    employeeCount: resolveDashboardEmployeeCount(source),
    processingStatus: resolveDashboardStatus(source),
    runtimeHealth: resolveDashboardHealth(source),
    departments: metric(departments),
    costCentres: metric(costCentres),
    payrollPeriods: metric(payrollCalendar),
    payElementGroups: {
      available: availableGroups.length,
      total: payElements.groups.length,
    },
    unavailableContracts,
  };
}
