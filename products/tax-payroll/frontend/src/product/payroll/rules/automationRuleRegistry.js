export const AUTOMATION_RULES = Object.freeze([
  {
    id: 'retry-failed-submission',
    label: 'Retry failed submission',
    trigger: 'submission-failed',
    commandType: 'retry-submission',
    enabled: true,
  },
  {
    id: 'escalate-rejected-submission',
    label: 'Escalate rejected submission',
    trigger: 'submission-rejected',
    commandType: 'refresh-operational-state',
    enabled: true,
  },
  {
    id: 'archive-completed-payroll',
    label: 'Archive completed payroll',
    trigger: 'payroll-completed',
    commandType: 'archive-completed-payroll',
    enabled: false,
  },
]);
