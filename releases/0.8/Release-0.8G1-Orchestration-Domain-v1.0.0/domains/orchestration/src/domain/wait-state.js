import { createId, nowIso, normalizeMetadata, assertRequired } from './helpers.js';
import { WaitStateType } from './approval-types.js';

export function createWaitState(input = {}) {
  assertRequired(input.executionId, 'Wait executionId is required');

  const timestamp = nowIso();

  return {
    id: input.id || createId('wait'),
    executionId: input.executionId,
    type: input.type || WaitStateType.APPROVAL,
    reason: input.reason || null,
    startedAt: input.startedAt || timestamp,
    resumedAt: input.resumedAt || null,
    metadata: normalizeMetadata(input.metadata),
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp
  };
}
