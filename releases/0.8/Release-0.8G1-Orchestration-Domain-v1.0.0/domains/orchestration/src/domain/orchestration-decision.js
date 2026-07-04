import { createId, nowIso, normalizeMetadata, assertRequired } from './helpers.js';
import { OrchestrationDecisionOperator } from './orchestration-types.js';

export function createOrchestrationDecision(input = {}) {
  assertRequired(input.field, 'Orchestration decision field is required');

  const timestamp = nowIso();

  return {
    id: input.id || createId('orchestration_decision'),
    field: input.field,
    operator: input.operator || OrchestrationDecisionOperator.EQUALS,
    value: input.value ?? null,
    trueStepKey: input.trueStepKey || null,
    falseStepKey: input.falseStepKey || null,
    metadata: normalizeMetadata(input.metadata),
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp
  };
}
