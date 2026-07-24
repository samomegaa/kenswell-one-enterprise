export function evaluateCompliance(summary) {
  if (summary.blocking > 0) {
    return Object.freeze({
      status: 'blocked',
      approvable: false,
      reason: 'Blocking validation findings remain',
    });
  }

  if (summary.errors > 0) {
    return Object.freeze({
      status: 'attention',
      approvable: false,
      reason: 'Validation errors remain',
    });
  }

  return Object.freeze({
    status: summary.warnings > 0 ? 'attention' : 'clear',
    approvable: true,
    reason:
      summary.warnings > 0
        ? 'Warnings require acknowledgement'
        : 'Compliance checks clear',
  });
}
