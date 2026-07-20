function numeric(value) {
  if (
    value === undefined ||
    value === null ||
    value === ''
  ) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : null;
}

export function formatCurrency(value) {
  const number = numeric(value);

  if (number === null) {
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

export function formatHours(value) {
  const number = numeric(value);

  if (number === null) {
    return value;
  }

  return `${number} hours`;
}

export function formatDays(value) {
  const number = numeric(value);

  if (number === null) {
    return value;
  }

  return `${number} days`;
}
