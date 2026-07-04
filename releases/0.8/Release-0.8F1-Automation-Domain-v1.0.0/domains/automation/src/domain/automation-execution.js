import { createId, nowIso, normalizeMetadata, assertRequired } from './helpers.js';
import { AutomationExecutionStatus } from './automation-types.js';

export function createAutomationExecution(input = {}) {
  assertRequired(input.ruleId, 'Automation execution ruleId is required');

  const timestamp = nowIso();

  return {
    id: input.id || createId('automation_execution'),
    ruleId: input.ruleId,
    triggerEventId: input.triggerEventId || null,
    triggerType: input.triggerType || null,
    status: input.status || AutomationExecutionStatus.PENDING,
    startedAt: input.startedAt || timestamp,
    completedAt: input.completedAt || null,
    result: input.result || null,
    error: input.error || null,
    payload: normalizeMetadata(input.payload),
    metadata: normalizeMetadata(input.metadata),
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp
  };
}
