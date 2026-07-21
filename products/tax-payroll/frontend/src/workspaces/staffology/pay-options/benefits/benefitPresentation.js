function missing(value) {
  return value === undefined ||
    value === null ||
    value === '';
}

export function presentBenefitBoolean(value) {
  if (missing(value)) {
    return value;
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  const normalised = String(value)
    .trim()
    .toLowerCase();

  if (normalised === 'true') {
    return 'Yes';
  }

  if (normalised === 'false') {
    return 'No';
  }

  return value;
}

export function presentBenefitMoney(value) {
  if (missing(value)) {
    return value;
  }

  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return value;
  }

  return new Intl.NumberFormat(
    'en-GB',
    {
      style: 'currency',
      currency: 'GBP',
    }
  ).format(amount);
}

export function displayBenefitValue(value) {
  return missing(value) ? '—' : String(value);
}
