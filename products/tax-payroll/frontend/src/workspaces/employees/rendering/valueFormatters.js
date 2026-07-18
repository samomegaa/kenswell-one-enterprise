export function formatDisplayValue(
  value,
  type
) {
  if (value === null || value === undefined || value === '') {
    return '—';
  }

  if (type === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  if (type === 'money') {
    const amount = Number(value);

    if (!Number.isNaN(amount)) {
      return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format(amount);
    }
  }

  if (type === 'percentage') {
    return `${value}%`;
  }

  if (type === 'date' || type === 'datetime') {
    const date = new Date(value);

    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'medium',
        ...(type === 'datetime'
          ? { timeStyle: 'short' }
          : {}),
      }).format(date);
    }
  }

  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
}
