import { createId, nowIso, normalizeMetadata, assertRequired } from './helpers.js';
import { AutomationConditionOperator } from './automation-types.js';

export function createAutomationCondition(input = {}) {
  assertRequired(input.field, 'Automation condition field is required');

  const timestamp = nowIso();

  return {
    id: input.id || createId('automation_condition'),
    field: input.field,
    operator: input.operator || AutomationConditionOperator.EQUALS,
    value: input.value ?? null,
    required: input.required !== false,
    metadata: normalizeMetadata(input.metadata),
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp
  };
}
