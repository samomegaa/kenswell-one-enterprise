import { createId, nowIso, normalizeMetadata, assertRequired } from './helpers.js';
import { OrchestrationStepType, OrchestrationStepStatus } from './orchestration-types.js';

export function createOrchestrationStep(input = {}) {
  assertRequired(input.key, 'Orchestration step key is required');
  assertRequired(input.title, 'Orchestration step title is required');

  const timestamp = nowIso();

  return {
    id: input.id || createId('orchestration_step'),
    key: input.key,
    title: input.title,
    description: input.description || null,
    type: input.type || OrchestrationStepType.ACTION,
    status: input.status || OrchestrationStepStatus.PENDING,
    order: Number.isFinite(input.order) ? input.order : 0,
    dependsOn: Array.isArray(input.dependsOn) ? input.dependsOn : [],
    actionType: input.actionType || null,
    workflowKey: input.workflowKey || null,
    automationKey: input.automationKey || null,
    timeoutMinutes: input.timeoutMinutes || null,
    metadata: normalizeMetadata(input.metadata),
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp
  };
}
