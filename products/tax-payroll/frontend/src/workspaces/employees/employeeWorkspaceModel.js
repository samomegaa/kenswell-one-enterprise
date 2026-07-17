export const EMPLOYEE_SECTIONS = Object.freeze([
  { id: 'summary', label: 'Summary' },
  { id: 'employment', label: 'Employment' },
  { id: 'payroll', label: 'Payroll' },
  { id: 'tax', label: 'Tax & NI' },
  { id: 'pension', label: 'Pension' },
  { id: 'leave', label: 'Leave' },
  { id: 'provider', label: 'Provider' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'audit', label: 'Audit' },
]);

export function displayName(employee) {
  return employee?.identity?.displayName || [employee?.identity?.title, employee?.identity?.firstName, employee?.identity?.lastName].filter(Boolean).join(' ') || 'Employee';
}

export function displayStatus(employee) {
  const value = employee?.employment?.status || 'draft';
  return value.replaceAll('_', ' ').replace(/\w/g, (letter) => letter.toUpperCase());
}

export function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}
