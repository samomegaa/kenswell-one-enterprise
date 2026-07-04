import { createId, nowIso, normalizeMetadata, assertRequired } from './helpers.js';

export function createOrchestrationCheckpoint(input = {}) {
  assertRequired(input.executionId, 'Orchestration checkpoint executionId is required');
  assertRequired(input.stepKey, 'Orchestration checkpoint stepKey is required');

  const timestamp = nowIso();

  return {
    id: input.id || createId('orchestration_checkpoint'),
    executionId: input.executionId,
    stepKey: input.stepKey,
    status: input.status || 'RECORDED',
    note: input.note || null,
    payload: normalizeMetadata(input.payload),
    metadata: normalizeMetadata(input.metadata),
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp
  };
}
