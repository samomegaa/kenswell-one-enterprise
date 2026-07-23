export function formatPayrollMoney(value) {
  if (
    value === null ||
    value === undefined ||
    value === ''
  ) {
    return 'Unavailable';
  }

  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return String(value);
  }

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
}

export function formatPayrollCount(value) {
  if (
    value === null ||
    value === undefined ||
    value === ''
  ) {
    return 'Unavailable';
  }

  const count = Number(value);

  return Number.isFinite(count)
    ? String(count)
    : String(value);
}
