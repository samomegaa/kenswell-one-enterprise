export const AUTOMATION_SCHEDULES = Object.freeze([
  {
    id: 'submission-health-hourly',
    label: 'Submission health check',
    frequency: 'hourly',
    ruleId: 'retry-failed-submission',
    enabled: true,
  },
  {
    id: 'payroll-completion-daily',
    label: 'Completed payroll review',
    frequency: 'daily',
    ruleId: 'archive-completed-payroll',
    enabled: true,
  },
  {
    id: 'rejection-event-watch',
    label: 'Submission rejection watch',
    frequency: 'event',
    eventName: 'PayrollSubmissionRejected',
    ruleId: 'escalate-rejected-submission',
    enabled: true,
  },
]);
