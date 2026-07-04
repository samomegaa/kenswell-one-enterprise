import { createId, nowIso, normalizeMetadata, assertRequired } from './helpers.js';
import { ClientApprovalStatus } from './client-portal-types.js';

export function createClientApproval(input = {}) {
  assertRequired(input.clientId, 'Client approval clientId is required');
  assertRequired(input.title, 'Client approval title is required');

  const timestamp = nowIso();

  return {
    id: input.id || createId('client_approval'),
    clientId: input.clientId,
    matterId: input.matterId || null,
    approvalRequestId: input.approvalRequestId || null,
    title: input.title,
    description: input.description || null,
    status: input.status || ClientApprovalStatus.REQUESTED,
    decidedBy: input.decidedBy || null,
    decidedAt: input.decidedAt || null,
    notes: input.notes || null,
    metadata: normalizeMetadata(input.metadata),
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp
  };
}
