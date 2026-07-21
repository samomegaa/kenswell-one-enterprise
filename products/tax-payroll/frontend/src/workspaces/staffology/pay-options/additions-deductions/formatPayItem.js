export function formatPayItemAmount(value) {
  if (
    value === undefined ||
    value === null ||
    value === ''
  ) {
    return value;
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return value;
  }

  return new Intl.NumberFormat(
    'en-GB',
    {
      style: 'currency',
      currency: 'GBP',
    }
  ).format(number);
}
