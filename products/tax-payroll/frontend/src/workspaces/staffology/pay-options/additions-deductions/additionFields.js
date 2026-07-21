export const ADDITION_FIELDS = Object.freeze({
  collections: Object.freeze([
    'additions',
    'recurringAdditions',
    'payAdditions',
    'employeeAdditions',
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
