import { createId, nowIso, normalizeMetadata, assertRequired } from './helpers.js';
import { OrchestrationExecutionStatus } from './orchestration-types.js';

export function createOrchestrationExecution(input = {}) {
  assertRequired(input.planId, 'Orchestration execution planId is required');

  const timestamp = nowIso();

  return {
    id: input.id || createId('orchestration_execution'),
    planId: input.planId,
    planKey: input.planKey || null,
    firmId: input.firmId || null,
    clientId: input.clientId || null,
    matterId: input.matterId || null,
    workflowId: input.workflowId || null,
    status: input.status || OrchestrationExecutionStatus.PENDING,
    currentStepKey: input.currentStepKey || null,
    completedSteps: Array.isArray(input.completedSteps) ? input.completedSteps : [],
    failedSteps: Array.isArray(input.failedSteps) ? input.failedSteps : [],
    startedBy: input.startedBy || null,
    startedAt: input.startedAt || timestamp,
    completedAt: input.completedAt || null,
    metadata: normalizeMetadata(input.metadata),
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp
  };
}
