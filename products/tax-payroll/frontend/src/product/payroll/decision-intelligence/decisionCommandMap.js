export const DECISION_COMMAND_MAP = Object.freeze({
  recover: 'restart-pipeline',
  retry: 'retry-submission',
  pause: 'pause-pipeline',
  resume: 'resume-pipeline',
  archive: 'archive-completed-payroll',
  escalate: 'refresh-operational-state',
  notify: 'refresh-operational-state',
});
