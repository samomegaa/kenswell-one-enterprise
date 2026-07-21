export const BENEFIT_FIELDS = Object.freeze({
  collections: Object.freeze([
    'benefits',
    'employeeBenefits',
    'payrolledBenefits',
    'benefitInKind',
    'benefitsInKind',
  ]),

  type: Object.freeze([
    'benefitType',
    'type',
    'category',
    'kind',
  ]),

  description: Object.freeze([
    'description',
    'name',
    'label',
    'benefitName',
  ]),

  cashEquivalent: Object.freeze([
    'cashEquivalent',
    'annualCashEquivalent',
    'taxableValue',
    'value',
    'amount',
  ]),

  payrolled: Object.freeze([
    'payrolled',
    'isPayrolled',
    'payrollingEnabled',
  ]),

  p11dRequired: Object.freeze([
    'p11dRequired',
    'requiresP11d',
    'reportOnP11d',
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

  status: Object.freeze([
    'status',
    'benefitStatus',
    'state',
  ]),
});
