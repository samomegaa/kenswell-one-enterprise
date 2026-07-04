import { createId, nowIso, normalizeMetadata, assertRequired } from './helpers.js';
import { AutomationRuleStatus } from './automation-types.js';

export function createAutomationRule(input = {}) {
  assertRequired(input.firmId, 'Automation rule firmId is required');
  assertRequired(input.key, 'Automation rule key is required');
  assertRequired(input.name, 'Automation rule name is required');

  const timestamp = nowIso();

  return {
    id: input.id || createId('automation_rule'),
    firmId: input.firmId,
    key: input.key,
    name: input.name,
    description: input.description || null,
    status: input.status || AutomationRuleStatus.DRAFT,
    priority: Number.isFinite(input.priority) ? input.priority : 100,
    triggers: Array.isArray(input.triggers) ? input.triggers : [],
    conditions: Array.isArray(input.conditions) ? input.conditions : [],
    actions: Array.isArray(input.actions) ? input.actions : [],
    policy: input.policy || null,
    metadata: normalizeMetadata(input.metadata),
    createdBy: input.createdBy || null,
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp
  };
}
