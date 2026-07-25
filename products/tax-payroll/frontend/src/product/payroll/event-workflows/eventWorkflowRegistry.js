export const EVENT_WORKFLOWS = Object.freeze([
  {
    id: 'submission-rejected-workflow',
    eventName: 'PayrollSubmissionRejected',
    runbookId: 'submission-rejection-runbook',
    commandType: 'refresh-operational-state',
    enabled: true,
  },
  {
    id: 'pipeline-failed-workflow',
    eventName: 'PayrollPipelineFailed',
    runbookId: 'pipeline-recovery-runbook',
    commandType: 'restart-pipeline',
    enabled: true,
  },
]);
