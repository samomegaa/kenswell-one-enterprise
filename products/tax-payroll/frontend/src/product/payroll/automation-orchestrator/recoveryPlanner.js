export function createRecoveryPlan(execution, failedNode) {
  return Object.freeze({
    id: crypto.randomUUID(),
    executionId: execution.id,
    failedNodeId: failedNode.id,
    strategy: failedNode.retryable
      ? 'retry-from-checkpoint'
      : 'manual-intervention',
    status: 'planned',
    createdAt: new Date().toISOString(),
  });
}
