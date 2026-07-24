import { createPipeline } from './createPipeline';
export function restorePipeline(stored, execution) {
  if (!execution?.id) return null;
  if (stored?.executionId === execution.id && stored?.status !== 'cancelled') {
    return Object.freeze({ ...stored, restored: true });
  }
  return createPipeline(execution);
}
