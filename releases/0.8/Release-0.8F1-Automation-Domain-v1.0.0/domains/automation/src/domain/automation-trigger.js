import { createId, nowIso, normalizeMetadata, assertRequired } from './helpers.js';
import { AutomationTriggerType } from './automation-types.js';

export function createAutomationTrigger(input = {}) {
  assertRequired(input.type, 'Automation trigger type is required');

  const timestamp = nowIso();

  return {
    id: input.id || createId('automation_trigger'),
    type: input.type || AutomationTriggerType.EVENT,
    eventType: input.eventType || null,
    schedule: input.schedule || null,
    enabled: input.enabled !== false,
    metadata: normalizeMetadata(input.metadata),
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp
  };
}
