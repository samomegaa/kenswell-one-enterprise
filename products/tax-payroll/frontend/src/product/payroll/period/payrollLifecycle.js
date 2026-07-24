export const PAYROLL_LIFECYCLE = Object.freeze([
  'created',
  'activated',
  'employee-selection',
  'calculation',
  'validation',
  'approval',
  'fps-preparation',
  'submitted',
  'closed',
]);

export function isPayrollLifecycleStage(stage) {
  return PAYROLL_LIFECYCLE.includes(stage);
}

export function getNextPayrollStage(stage) {
  const index = PAYROLL_LIFECYCLE.indexOf(stage);

  if (index < 0 || index === PAYROLL_LIFECYCLE.length - 1) {
    return stage;
  }

  return PAYROLL_LIFECYCLE[index + 1];
}
