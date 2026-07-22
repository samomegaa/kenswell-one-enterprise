export const LEAVE_FIELDS = Object.freeze({
  collections: Object.freeze([
    'leave',
    'leaves',
    'leaveRecords',
    'employeeLeave',
    'absences',
  ]),

  type: Object.freeze([
    'leaveType',
    'absenceType',
    'type',
    'category',
  ]),

  startDate: Object.freeze([
    'startDate',
    'fromDate',
    'effectiveFrom',
  ]),

  endDate: Object.freeze([
    'endDate',
    'toDate',
    'effectiveTo',
  ]),

  duration: Object.freeze([
    'duration',
    'numberOfDays',
    'days',
    'units',
  ]),

  unit: Object.freeze([
    'durationUnit',
    'unit',
    'leaveUnit',
  ]),

  paid: Object.freeze([
    'paid',
    'isPaid',
    'paidLeave',
  ]),

  paymentStatus: Object.freeze([
    'paymentStatus',
    'payStatus',
    'statutoryPayStatus',
  ]),

  entitlementImpact: Object.freeze([
    'entitlementImpact',
    'deductFromEntitlement',
    'entitlementDeduction',
  ]),

  status: Object.freeze([
    'status',
    'leaveStatus',
    'state',
  ]),

  reason: Object.freeze([
    'reason',
    'description',
    'notes',
  ]),
});
