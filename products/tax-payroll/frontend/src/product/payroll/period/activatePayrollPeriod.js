import {
  createDefaultPayrollPeriod,
} from './createDefaultPayrollPeriod';

export function activatePayrollPeriod(
  session,
  candidate
) {
  if (!session?.employerId) {
    return null;
  }

  const period =
    candidate || createDefaultPayrollPeriod(session);

  if (period.employerId !== session.employerId) {
    return createDefaultPayrollPeriod(session);
  }

  return Object.freeze({
    ...period,
    status: 'active',
  });
}
