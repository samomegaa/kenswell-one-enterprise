export const ORCHESTRATION_STATUS = Object.freeze({
  PLANNED: 'planned',
  READY: 'ready',
  WAITING: 'waiting',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
});

export const ORCHESTRATION_PRIORITY = Object.freeze({
  LOW: 10,
  NORMAL: 50,
  HIGH: 80,
  CRITICAL: 100,
});
