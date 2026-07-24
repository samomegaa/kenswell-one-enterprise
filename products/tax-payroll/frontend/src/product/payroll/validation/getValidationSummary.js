export function getValidationSummary(findings = []) {
  const open = findings.filter((item) => !item.resolved);
  const blocking = open.filter(
    (item) => item.severity === 'blocking'
  );
  const errors = open.filter(
    (item) => item.severity === 'error'
  );
  const warnings = open.filter(
    (item) => item.severity === 'warning'
  );

  return Object.freeze({
    total: findings.length,
    open: open.length,
    blocking: blocking.length,
    errors: errors.length,
    warnings: warnings.length,
    ready: blocking.length === 0 && errors.length === 0,
  });
}
