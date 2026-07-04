import { createId, nowIso, normalizeMetadata, assertRequired } from './helpers.js';

export function createParallelGroup(input = {}) {
  assertRequired(input.key, 'Parallel group key is required');
  assertRequired(input.name, 'Parallel group name is required');

  const timestamp = nowIso();

  return {
    id: input.id || createId('parallel_group'),
    key: input.key,
    name: input.name,
    description: input.description || null,
    stepKeys: Array.isArray(input.stepKeys) ? input.stepKeys : [],
    joinStepKey: input.joinStepKey || null,
    requiredCompletions: input.requiredCompletions || 'ALL',
    metadata: normalizeMetadata(input.metadata),
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp
  };
}
