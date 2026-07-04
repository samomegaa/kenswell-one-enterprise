import { createId, nowIso, normalizeMetadata, assertRequired } from './helpers.js';
import { PortalAccessStatus } from './client-portal-types.js';

export function createPortalAccess(input = {}) {
  assertRequired(input.clientId, 'Portal access clientId is required');
  assertRequired(input.email, 'Portal access email is required');

  const timestamp = nowIso();

  return {
    id: input.id || createId('portal_access'),
    clientId: input.clientId,
    email: input.email,
    status: input.status || PortalAccessStatus.INVITED,
    invitedBy: input.invitedBy || null,
    invitedAt: input.invitedAt || timestamp,
    activatedAt: input.activatedAt || null,
    revokedAt: input.revokedAt || null,
    metadata: normalizeMetadata(input.metadata),
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp
  };
}
