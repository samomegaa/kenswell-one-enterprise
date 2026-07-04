import { createId, nowIso, normalizeMetadata, assertRequired } from './helpers.js';
import { ClientActivityType } from './client-portal-types.js';

export function createClientActivity(input = {}) {
  assertRequired(input.clientId, 'Client activity clientId is required');
  assertRequired(input.type, 'Client activity type is required');

  const timestamp = nowIso();

  return {
    id: input.id || createId('client_activity'),
    clientId: input.clientId,
    type: input.type || ClientActivityType.LOG
    title: input.title || null,
    description: input.description || null,
    act

    metadata: normalizeMetadata(input.metadata),

    updatedAt: input.updatedAt || timestamp
  };
}
