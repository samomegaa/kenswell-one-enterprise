export function displayApprovalValue(value) {
  return value === null || value === undefined || value === ''
    ? 'Unavailable'
    : String(value);
}

export function displayApprovalBoolean(value) {
  if (value === true) return 'Ready';
  if (value === false) return 'Not ready';
  return 'Unavailable';
}

export function displayApprovalDate(value) {
  if (!value) return 'Unavailable';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}
