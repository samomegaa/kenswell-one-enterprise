import { createExecutionQueue } from '../execution';

export function createPipeline(execution) {
  if (!execution?.id) return null;
  return Object.freeze({
    id: `pipeline:${execution.id}`,
    executionId: execution.id,
    periodId: execution.periodId,
    employerId: execution.employerId,
    status: 'ready', checkpoint: 'pipeline-created',
    processed: 0, total: 0,
    queue: createExecutionQueue(), results: [],
    startedAt: null, updatedAt: new Date().toISOString(),
  });
}
