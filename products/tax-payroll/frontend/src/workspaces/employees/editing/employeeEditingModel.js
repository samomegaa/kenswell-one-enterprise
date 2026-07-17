export const EDITING_SECTIONS = Object.freeze([
  { id: 'identity', label: 'Identity' },
  { id: 'employment', label: 'Employment' },
  { id: 'payroll', label: 'Payroll' },
  { id: 'tax', label: 'Tax & NI' },
  { id: 'pension', label: 'Pension' },
  { id: 'lifecycle', label: 'Lifecycle' },
  { id: 'review', label: 'Review' },
]);

export const LIFECYCLE_ACTIONS = Object.freeze([
  { id: 'activate', label: 'Activate employee', status: 'active' },
  { id: 'leave', label: 'Mark as leaver', status: 'left' },
  { id: 'rehire', label: 'Rehire employee', status: 'active' },
  { id: 'suspend', label: 'Suspend employee', status: 'suspended' },
]);

export function cloneEmployee(employee) {
  return JSON.parse(JSON.stringify(employee));
}

export function editingTitle(employee) {
  const identity = employee?.identity || {};

  return [identity.firstName, identity.lastName]
    .filter(Boolean)
    .join(' ') || 'Employee';
}
