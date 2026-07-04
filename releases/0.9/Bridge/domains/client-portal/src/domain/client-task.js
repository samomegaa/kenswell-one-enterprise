import { createId, nowIso, normalizeMetadata, assertRequired } from './helpers.js';
import { ClientTaskStatus } from './client-portal-types.js';

export function createClientTask(input = {}) {
  assertRequired(input.clientId, 'Client task clientId is required');
  assertRequired(input.title, 'Client task title is required');

  const timestamp = nowIso();

  return {
    id: input.id || createId('client_task'),
    clientId: input.clientId,
    matterId: input.matterId || null,
    workflowId: input.workflowId || null,
    orchestrationExecutionId: input.orchestrationExecutionId || null,
    title: input.title,
    description: input.description || null,
    status: input.status || ClientTaskStatus.OPEN,
    dueAt: input.dueAt || null,
    completedAt: input.completedAt || null,
    metadata: normalizeMetadata(input.metadata),
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp
  };
}
