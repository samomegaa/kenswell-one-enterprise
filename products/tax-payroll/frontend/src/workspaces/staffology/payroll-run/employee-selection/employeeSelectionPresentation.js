export function displayEmployeeValue(value) {
  return value === null ||
    value === undefined ||
    value === ''
    ? '—'
    : String(value);
}

export function normaliseEmploymentStatus(value) {
  if (!value) return 'Unavailable';

  const status = String(value)
    .trim()
    .toLowerCase();

  if (
    status === 'active' ||
    status === 'current' ||
    status === 'employed'
  ) {
    return 'Active';
  }

  if (
    status === 'inactive' ||
    status === 'leaver' ||
    status === 'terminated'
  ) {
    return 'Inactive';
  }

  return String(value);
}

export function defaultEmployeeIncluded(value) {
  if (typeof value === 'boolean') return value;
  return true;
}
