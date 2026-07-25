export const COMMAND_REGISTRY = Object.freeze([
  {
    id: 'retry-submission',
    label: 'Retry failed submission',
    requiresApproval: true,
  },
  {
    id: 'restart-pipeline',
    label: 'Restart payroll pipeline',
    requiresApproval: true,
  },
  {
    id: 'rerun-validation',
    label: 'Re-run validation',
    requiresApproval: false,
  },
  {
    id: 'refresh-operational-state',
    label: 'Refresh operational state',
    requiresApproval: false,
  },
  {
    id: 'archive-completed-payroll',
    label: 'Archive completed payroll',
    requiresApproval: true,
  },
]);
