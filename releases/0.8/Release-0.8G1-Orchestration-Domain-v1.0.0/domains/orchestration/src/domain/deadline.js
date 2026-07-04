import { createId, nowIso, normalizeMetadata, assertRequired } from './helpers.js';
import { DeadlineStatus, EscalationLevel } from './sla-types.js';

export function createDeadline(input = {}) {
  assertRequired(input.executionId, 'Deadline executionId is required');
  assertRequired(input.dueAt, 'Deadline dueAt is required');

  const timestamp = nowIso();

  return {
    id: input.id || createId('deadline'),
    executionId: input.executionId,
    stepKey: input.stepKey || null,
    dueAt: input.dueAt,
    status: input.status || DeadlineStatus.UPCOMING,
    escalationLevel: input.escalationLevel || EscalationLevel.NONE,
    reminderSentAt: input.reminderSentAt || null,
    escalatedAt: input.escalatedAt || null,
    breachedAt: input.breachedAt || null,
    metadata: normalizeMetadata(input.metadata),
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp
  };
}
