const isUnknown = (value) =>
  value === undefined ||
  value === null ||
  value === '';

export function presentBoolean(value) {
  if (isUnknown(value)) return value;
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  const normalised = String(value)
    .trim()
    .toLowerCase();

  if (normalised === 'true') return 'Yes';
  if (normalised === 'false') return 'No';
  return value;
}

export function presentTaxBasis(value) {
  if (isUnknown(value)) return value;
  if (value === true || value === 'true') {
    return 'Week 1 / Month 1';
  }
  if (value === false || value === 'false') {
    return 'Cumulative';
  }
  return value;
}

export function presentMoney(value) {
  if (isUnknown(value)) return value;
  const amount = Number(value);
  if (!Number.isFinite(amount)) return value;

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
}

export function presentStudentLoan(value) {
  if (isUnknown(value)) return value;
  if (value === false || value === 'false') {
    return 'No student loan';
  }
  if (value === true || value === 'true') {
    return 'Yes';
  }

  const key = String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  const labels = {
    none: 'No student loan',
    plan1: 'Plan 1',
    plan2: 'Plan 2',
    plan4: 'Plan 4',
    plan5: 'Plan 5',
    postgraduate: 'Postgraduate',
  };

  return labels[key] || value;
}
