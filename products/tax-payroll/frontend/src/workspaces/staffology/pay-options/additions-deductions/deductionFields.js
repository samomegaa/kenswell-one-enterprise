export const DEDUCTION_FIELDS = Object.freeze({
  collections: Object.freeze([
    'deductions',
    'recurringDeductions',
    'payDeductions',
    'employeeDeductions',
  ]),
  description: Object.freeze([
    'description',
    'name',
    'label',
    'payCodeName',
  ]),
  code: Object.freeze([
    'code',
    'payCode',
    'payCodeCode',
  ]),
  amount: Object.freeze([
    'amount',
    'value',
    'rate',
  ]),
  frequency: Object.freeze([
    'frequency',
    'schedule',
    'payFrequency',
  ]),
  startDate: Object.freeze([
    'startDate',
    'effectiveFrom',
    'fromDate',
  ]),
  endDate: Object.freeze([
    'endDate',
    'effectiveTo',
    'toDate',
  ]),
});
