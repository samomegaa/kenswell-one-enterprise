export const OPERATIONAL_RUNBOOKS = Object.freeze([
  {
    id: 'submission-rejection-runbook',
    title: 'Submission rejection response',
    commandType: 'refresh-operational-state',
    steps: [
      'Capture rejection response',
      'Refresh enterprise operational state',
      'Notify payroll administrator',
      'Review Staffology provider details',
      'Create corrective command if required',
    ],
  },
  {
    id: 'pipeline-recovery-runbook',
    title: 'Payroll pipeline recovery',
    commandType: 'restart-pipeline',
    steps: [
      'Confirm failed pipeline state',
      'Review operational timeline',
      'Create governed recovery command',
      'Await approval',
      'Resume through Command Centre',
    ],
  },
  {
    id: 'completion-review-runbook',
    title: 'Completed payroll review',
    commandType: 'archive-completed-payroll',
    steps: [
      'Verify reconciliation complete',
      'Confirm payroll completion',
      'Create archive command',
      'Await approval',
      'Record archive outcome',
    ],
  },
]);
