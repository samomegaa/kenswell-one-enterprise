export function validateRunSetup(run) {
  const errors = {};

  if (!run.payScheduleId) {
    errors.payScheduleId = 'Pay schedule is required';
  }

  if (!run.periodStart) {
    errors.periodStart = 'Period start date is required';
  }

  if (!run.periodEnd) {
    errors.periodEnd = 'Period end date is required';
  }

  if (!run.paymentDate) {
    errors.paymentDate = 'Payment date is required';
  }

  if (
    run.periodStart &&
    run.periodEnd &&
    new Date(run.periodStart) > new Date(run.periodEnd)
  ) {
    errors.periodEnd = 'Period end must be after period start';
  }

  return errors;
}

export function validateEmployeeSelection(run) {
  return run.employeeIds.length
    ? {}
    : { employeeIds: 'Select at least one employee' };
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
