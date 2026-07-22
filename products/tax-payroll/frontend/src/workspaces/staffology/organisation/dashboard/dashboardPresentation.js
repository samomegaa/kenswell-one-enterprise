export function presentDashboardValue(value) {
  if (
    value === undefined ||
    value === null ||
    value === ''
  ) {
    return '—';
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  return String(value);
}

export function presentCollectionCount(metric) {
  return metric.available
    ? String(metric.count)
    : 'Unavailable';
}
