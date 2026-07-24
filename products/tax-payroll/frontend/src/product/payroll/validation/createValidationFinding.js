export function createValidationFinding(input = {}) {
  return Object.freeze({
    id: input.id || crypto.randomUUID(),
    code: input.code || 'PAYROLL_VALIDATION',
    message: input.message || 'Payroll validation finding',
    severity: input.severity || 'warning',
    employeeId: input.employeeId || null,
    source: input.source || 'enterprise',
    resolved: Boolean(input.resolved),
  });
}
