export function closePayrollPeriod(period) {
  if (!period) {
    return null;
  }

  return Object.freeze({
    ...period,
    status: 'closed',
    stage: 'closed',
    closedAt: new Date().toISOString(),
  });
}
