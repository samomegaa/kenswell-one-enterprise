export function formatTaxNiBoolean(value) {
  if (value === undefined || value === null || value === '') return value;
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return value;
}

export function formatTaxNiMoney(value) {
  if (value === undefined || value === null || value === '') return value;
  const amount = Number(value);
  if (!Number.isFinite(amount)) return value;
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
}
