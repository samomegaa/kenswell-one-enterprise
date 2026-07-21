export function formatLoanMoney(value) {
  if (value === undefined || value === null || value === '') {
    return value;
  }
  const amount = Number(value);
  if (!Number.isFinite(amount)) return value;
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
}

export function displayLoanValue(value) {
  return value === undefined || value === null || value === ''
    ? '—'
    : String(value);
}
