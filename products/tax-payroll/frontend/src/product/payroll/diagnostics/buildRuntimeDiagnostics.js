export function buildRuntimeDiagnostics(snapshot) {
  const issues = [];

  if (!snapshot?.session?.active) {
    issues.push('Payroll session inactive');
  }

  if (!snapshot?.period?.active) {
    issues.push('Payroll period inactive');
  }

  if (snapshot?.submission?.status === 'failed') {
    issues.push('Submission failed');
  }

  if (
    snapshot?.completion?.reconciliation?.status ===
    'mismatched'
  ) {
    issues.push('Submission reconciliation mismatch');
  }

  return Object.freeze({
    status: issues.length ? 'attention' : 'healthy',
    issues: Object.freeze(issues),
    checkedAt: new Date().toISOString(),
  });
}
