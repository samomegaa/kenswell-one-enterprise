import { createId, nowIso, normalizeMetadata, assertRequired } from './helpers.js';
import { SLAStatus } from './sla-types.js';

export function createSLAPolicy(input = {}) {
  assertRequired(input.key, 'SLA policy key is required');
  assertRequired(input.name, 'SLA policy name is required');

  const timestamp = nowIso();

  return {
    id: input.id || createId('sla_policy'),
    key: input.key,
    name: input.name,
    description: input.description || null,
    status: input.status || SLAStatus.ACTIVE,
    targetMinutes: Number.isFinite(input.targetMinutes) ? input.targetMinutes : 0,
    warningMinutes: Number.isFinite(input.warningMinutes) ? input.warningMinutes : null,
    escalationMinutes: Number.isFinite(input.escalationMinutes) ? input.escalationMinutes : null,
    criticalMinutes: Number.isFinite(input.criticalMinutes) ? input.criticalMinutes : null,
    metadata: normalizeMetadata(input.metadata),
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp
  };
}
