function missing(value) {
  return value === undefined ||
    value === null ||
    value === '';
}

export function presentOtherBoolean(value) {
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

export function presentPaymentMethod(value) {
  if (missing(value)) {
    return value;
  }

  const key = String(value)
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();

  const labels = {
    bacs: 'BACS',
    cash: 'Cash',
    cheque: 'Cheque',
    manual: 'Manual payment',
  };

  return labels[key] || value;
}
