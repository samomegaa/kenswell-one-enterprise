import { createRecoveryPlan } from './recoveryPlanner';

export function evaluateSelfHealing(input) {
  const incidentType =
    input.stalled ? 'stalled-orchestration' :
    input.retryCount >= 3 ? 'retry-exhaustion' :
    input.dependencyFailure ? 'dependency-failure' :
    input.queueStarved ? 'queue-starvation' :
    null;

  if (!incidentType) {
    return { healthy: true, plan: null };
  }

  return {
    healthy: false,
    plan: createRecoveryPlan({
      incidentType,
      dependencies: input.dependencies,
      checkpoint: input.checkpoint,
      affectedResources: input.affectedResources,
    }),
  };
}
