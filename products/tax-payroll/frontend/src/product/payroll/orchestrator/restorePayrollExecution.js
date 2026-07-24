import { createPayrollExecution } from './createPayrollExecution';

export function restorePayrollExecution(storedExecution, period) {
  if (!period?.id || period.status !== 'active') {
    return null;
  }

  if (
    storedExecution?.periodId === period.id &&
    storedExecution?.status !== 'cancelled'
  ) {
    return Object.freeze({
      ...storedExecution,
      restored: true,
    });
  }

  return createPayrollExecution(period);
}
