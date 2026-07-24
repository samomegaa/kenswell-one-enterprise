export const PIPELINE_CHECKPOINTS = Object.freeze([
  'pipeline-created', 'employees-loaded', 'calculation-started',
  'calculation-completed', 'validation-started', 'validation-completed',
  'approval-ready', 'fps-ready', 'completed',
]);

export function getNextCheckpoint(current) {
  const index = PIPELINE_CHECKPOINTS.indexOf(current);
  if (index < 0) return PIPELINE_CHECKPOINTS[0];
  return PIPELINE_CHECKPOINTS[index + 1] || null;
}
