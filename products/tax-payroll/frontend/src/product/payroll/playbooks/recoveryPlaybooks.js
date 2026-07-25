export const RECOVERY_PLAYBOOKS = Object.freeze({
  'retry-failed-submission': Object.freeze({
    title: 'Submission recovery',
    steps: Object.freeze([
      'Confirm submission failure',
      'Create governed retry command',
      'Await approval',
      'Execute through Command Centre',
      'Verify provider response',
    ]),
  }),
  'escalate-rejected-submission': Object.freeze({
    title: 'Submission rejection escalation',
    steps: Object.freeze([
      'Capture rejection details',
      'Refresh operational state',
      'Notify payroll administrator',
      'Review provider response',
    ]),
  }),
});
