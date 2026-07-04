import { createId, nowIso, normalizeMetadata, assertRequired } from './helpers.js';
import { ApprovalStatus } from './approval-types.js';

export function createApprovalRequest(input = {}) {
  assertRequired(input.executionId, 'Approval executionId is required');
  assertRequired(input.stepKey, 'Approval stepKey is required');

  const timestamp = nowIso();

  return {
    id: input.id || createId('approval'),
    executionId: input.executionId,
    stepKey: input.stepKey,
    requestedFrom: input.requestedFrom || null,
    requestedBy: input.requestedBy || null,
    status: input.status || ApprovalStatus.PENDING,
    dueAt: input.dueAt || null,
    notes: input.notes || null,
    metadata: normalizeMetadata(input.metadata),
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp
  };
}
