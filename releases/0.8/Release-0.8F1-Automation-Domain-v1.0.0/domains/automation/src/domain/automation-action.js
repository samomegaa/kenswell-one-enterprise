import { createId, nowIso, normalizeMetadata, assertRequired } from './helpers.js';
import { AutomationActionType } from './automation-types.js';

export function createAutomationAction(input = {}) {
  assertRequired(input.type, 'Automation action type is required');

  const timestamp = nowIso();

  return {
    id: input.id || createId('automation_action'),
    type: input.type || AutomationActionType.NOTIFY_USER,
    target: input.target || null,
    payload: normalizeMetadata(input.payload),
    enabled: input.enabled !== false,
    metadata: normalizeMetadata(input.metadata),
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp
  };
}
