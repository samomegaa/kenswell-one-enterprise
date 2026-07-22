export function presentDepartmentValue(value) {
  if (value === undefined || value === null || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Active' : 'Inactive';
  return String(value);
}
