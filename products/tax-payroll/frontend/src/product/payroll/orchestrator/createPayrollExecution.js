export function createPayrollExecution(period) {
  if (!period?.id || period.status !== 'active') {
    return null;
  }

  return Object.freeze({
    id: `execution:${period.id}`,
    periodId: period.id,
    employerId: period.employerId,
    state: period.stage,
    status: 'ready',
    startedAt: new Date().toISOString(),
    lastTransitionAt: null,
  });
}
