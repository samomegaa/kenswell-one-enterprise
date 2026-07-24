import {
  activatePayrollPeriod,
} from './activatePayrollPeriod';

export function restorePayrollPeriod(
  storedPeriod,
  session
) {
  if (!session?.employerId) {
    return null;
  }

  if (
    storedPeriod?.employerId === session.employerId &&
    storedPeriod?.status !== 'closed'
  ) {
    return Object.freeze({
      ...storedPeriod,
      status: 'active',
      restored: true,
    });
  }

  return activatePayrollPeriod(session);
}
