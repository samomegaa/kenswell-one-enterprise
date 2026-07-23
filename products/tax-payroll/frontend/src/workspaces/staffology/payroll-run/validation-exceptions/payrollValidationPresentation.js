export function normaliseValidationSeverity(value) {
  const severity = String(value || '')
    .trim()
    .toLowerCase();

  if (
    severity === 'error' ||
    severity === 'critical' ||
    severity === 'blocking'
  ) {
    return 'Error';
  }

  if (
    severity === 'warning' ||
    severity === 'warn'
  ) {
    return 'Warning';
  }

  if (
    severity === 'information' ||
    severity === 'info'
  ) {
    return 'Information';
  }

  return value ? String(value) : 'Unavailable';
}

export function displayValidationValue(value) {
  return value === null ||
    value === undefined ||
    value === ''
    ? '—'
    : String(value);
}
