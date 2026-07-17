export const PROCESSING_STEPS = Object.freeze([
  { id: 'period', label: 'Pay period' },
  { id: 'employees', label: 'Employees' },
  { id: 'validation', label: 'Validation' },
  { id: 'preview', label: 'Preview' },
  { id: 'approval', label: 'Approval' },
]);

export const RUN_STATUSES = Object.freeze({
  DRAFT: 'draft',
  VALIDATING: 'validating',
  READY: 'ready',
  APPROVED: 'approved',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
});

export const INITIAL_RUN = Object.freeze({
  payScheduleId: '',
  periodStart: '',
  periodEnd: '',
  paymentDate: '',
  employeeIds: [],
  notes: '',
});

export function cloneInitialRun() {
  return JSON.parse(JSON.stringify(INITIAL_RUN));
}

export function formatMoney(value, currency = 'GBP') {
  const number = Number(value || 0);

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  }).format(number);
}
