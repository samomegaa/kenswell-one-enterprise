import { createId, nowIso, normalizeMetadata, assertRequired } from './helpers.js';

export function createSLABreach(input = {}) {
  assertRequired(input.executionId, 'SLA breach executionId is required');
  assertRequired(input.deadlineId, 'SLA breach deadlineId is required');

  const timestamp = nowIso();

  return {
    id: input.id || createId('sla_breach'),
    executionId: input.executionId,
    deadlineId: input.deadlineId,
    stepKey: input.stepKey || null,
    reason: input.reason || 'SLA breached',
    severity: input.severity || 'HIGH',
    resolvedAt: input.resolvedAt || null,
    metadata: normalizeMetadata(input.metadata),
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp
  };
}
