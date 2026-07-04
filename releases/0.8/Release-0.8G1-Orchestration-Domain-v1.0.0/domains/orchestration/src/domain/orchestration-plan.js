import { createId, nowIso, normalizeMetadata, assertRequired } from './helpers.js';
import { OrchestrationPlanStatus } from './orchestration-types.js';

export function createOrchestrationPlan(input = {}) {
  assertRequired(input.firmId, 'Orchestration plan firmId is required');
  assertRequired(input.key, 'Orchestration plan key is required');
  assertRequired(input.name, 'Orchestration plan name is required');

  const timestamp = nowIso();

  return {
    id: input.id || createId('orchestration_plan'),
    firmId: input.firmId,
    key: input.key,
    name: input.name,
    description: input.description || null,
    status: input.status || OrchestrationPlanStatus.DRAFT,
    version: input.version || '1.0.0',
    steps: Array.isArray(input.steps) ? input.steps : [],
    decisions: Array.isArray(input.decisions) ? input.decisions : [],
    checkpoints: Array.isArray(input.checkpoints) ? input.checkpoints : [],
    metadata: normalizeMetadata(input.metadata),
    createdBy: input.createdBy || null,
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp
  };
}
