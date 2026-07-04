import { createId, nowIso, normalizeMetadata, assertRequired } from './helpers.js';

export function createPortalProfile(input = {}) {
  assertRequired(input.clientId, 'Portal profile clientId is required');

  const timestamp = nowIso();

  return {
    id: input.id || createId('portal_profile'),
    clientId: input.clientId,
    displayName: input.displayName || null,
    email: input.email || null,
    phone: input.phone || null,
    metadata: normalizeMetadata(input.metadata),
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp
  };
}
