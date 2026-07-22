import {
  presentCollectionCount,
  presentDashboardValue,
} from './dashboardPresentation';

export function createDashboardPresentationModel(model) {
  const organisation = model?.organisation || {};

  return {
    available: Boolean(model?.available),
    heading: {
      name: presentDashboardValue(organisation.name),
      provider: presentDashboardValue(
        organisation.provider
      ),
    },
    metrics: [
      {
        id: 'employees',
        label: 'Employees',
        value: presentDashboardValue(
          model?.employeeCount
        ),
      },
      {
        id: 'departments',
        label: 'Departments',
        value: presentCollectionCount(
          model.departments
        ),
      },
      {
        id: 'cost-centres',
        label: 'Cost centres',
        value: presentCollectionCount(
          model.costCentres
        ),
      },
      {
        id: 'payroll-periods',
        label: 'Payroll periods',
        value: presentCollectionCount(
          model.payrollPeriods
        ),
      },
      {
        id: 'pay-element-groups',
        label: 'Available pay-element groups',
        value:
          `${model.payElementGroups.available}` +
          ` of ${model.payElementGroups.total}`,
      },
      {
        id: 'unavailable-contracts',
        label: 'Unavailable contracts',
        value: String(model.unavailableContracts.length),
      },
    ],
    status: [
      {
        label: 'Processing status',
        value: presentDashboardValue(
          model?.processingStatus
        ),
      },
      {
        label: 'Runtime health',
        value: presentDashboardValue(
          model?.runtimeHealth
        ),
      },
      {
        label: 'Provider',
        value: presentDashboardValue(
          organisation.provider
        ),
      },
    ],
    unavailableContracts:
      model?.unavailableContracts || [],
  };
}
