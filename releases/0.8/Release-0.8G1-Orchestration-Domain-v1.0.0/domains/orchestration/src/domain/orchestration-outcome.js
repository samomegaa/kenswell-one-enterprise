import { createId, nowIso, normalizeMetadata, assertRequired } from './helpers.js';
import { OrchestrationOutcomeStatus } from './orchestration-types.js';

export function createOrchestrationOutcome(input = {}) {
  assertRequired(input.executionId, 'Orchestration outcome executionId is required');

  const timestamp = nowIso();

  return {
    id: input.id || createId('orchestration_outcome'),
    executionId: input.executionId,
    status: input.status || OrchestrationOutcomeStatus.SUCCESS,
    summary: input.summary || null,
    results: Array.isArray(input.results) ? input.results : [],
    error: input.error || null,
    metadata: normalizeMetadata(input.metadata),
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp
  };
}
