export const RECOVERY_PLAYBOOKS = Object.freeze([
  {
    id: 'stalled-orchestration',
    strategy: 'restart',
    commandType: 'restart-pipeline',
    approvalRequired: true,
  },
  {
    id: 'retry-exhaustion',
    strategy: 'escalate',
    commandType: 'refresh-operational-state',
    approvalRequired: true,
  },
  {
    id: 'dependency-failure',
    strategy: 'rollback',
    commandType: 'pause-pipeline',
    approvalRequired: true,
  },
  {
    id: 'queue-starvation',
    strategy: 'retry',
    commandType: 'resume-pipeline',
    approvalRequired: true,
  },
]);
