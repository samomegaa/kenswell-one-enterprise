export const PAYROLL_CALENDAR_PATHS = Object.freeze([
  'payrollCalendar',
  'payrollPeriods',
  'payPeriods',
  'calendar.payrollPeriods',
  'payroll.calendar',
  'payroll.periods',
  'settings.payrollCalendar',
  'metadata.payrollCalendar',
]);

export const PAYROLL_PERIOD_FIELDS = Object.freeze({
  id: [
    'id',
    'periodId',
    'payPeriodId',
    'externalId',
  ],
  name: [
    'name',
    'label',
    'periodName',
    'description',
  ],
  taxYear: [
    'taxYear',
    'year',
    'taxYearLabel',
  ],
  taxPeriod: [
    'taxPeriod',
    'period',
    'periodNumber',
    'payPeriod',
  ],
  frequency: [
    'frequency',
    'payFrequency',
    'payrollFrequency',
  ],
  startDate: [
    'startDate',
    'periodStart',
    'fromDate',
  ],
  endDate: [
    'endDate',
    'periodEnd',
    'toDate',
  ],
  cutOffDate: [
    'cutOffDate',
    'cutoffDate',
    'processingCutOff',
    'processingDeadline',
  ],
  paymentDate: [
    'paymentDate',
    'payDate',
    'datePaid',
  ],
  submissionDate: [
    'submissionDate',
    'submissionDeadline',
    'fpsDeadline',
  ],
  status: [
    'status',
    'processingStatus',
    'state',
  ],
});
