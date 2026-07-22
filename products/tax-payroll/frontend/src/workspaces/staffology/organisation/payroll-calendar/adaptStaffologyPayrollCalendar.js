import {
  resolvePayrollCalendar,
  resolvePayrollPeriodField,
} from './payrollCalendarResolver';

function adaptPayrollPeriod(item, index) {
  return {
    id:
      resolvePayrollPeriodField(item, 'id') ||
      `payroll-period-${index + 1}`,
    name:
      resolvePayrollPeriodField(item, 'name'),
    taxYear:
      resolvePayrollPeriodField(item, 'taxYear'),
    taxPeriod:
      resolvePayrollPeriodField(item, 'taxPeriod'),
    frequency:
      resolvePayrollPeriodField(item, 'frequency'),
    startDate:
      resolvePayrollPeriodField(item, 'startDate'),
    endDate:
      resolvePayrollPeriodField(item, 'endDate'),
    cutOffDate:
      resolvePayrollPeriodField(item, 'cutOffDate'),
    paymentDate:
      resolvePayrollPeriodField(item, 'paymentDate'),
    submissionDate:
      resolvePayrollPeriodField(
        item,
        'submissionDate'
      ),
    status:
      resolvePayrollPeriodField(item, 'status'),
  };
}

export function adaptStaffologyPayrollCalendar(
  input
) {
  const source =
    input?.employer ||
    input?.organisation ||
    input?.organization ||
    input ||
    {};

  const collection =
    resolvePayrollCalendar(source);

  return {
    available: collection.available,
    sourcePath: collection.sourcePath,
    items: collection.items.map(adaptPayrollPeriod),
  };
}
