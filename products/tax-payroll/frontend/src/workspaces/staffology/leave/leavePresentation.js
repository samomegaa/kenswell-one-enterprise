function missing(value) {
  return value === undefined ||
    value === null ||
    value === '';
}

export function presentLeaveBoolean(value) {
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

export function presentDuration(
  value,
  unit
) {
  if (missing(value)) {
    return value;
  }

  if (missing(unit)) {
    return value;
  }

  return `${value} ${unit}`;
}

export function displayLeaveValue(value) {
  return missing(value) ? '—' : String(value);
}
