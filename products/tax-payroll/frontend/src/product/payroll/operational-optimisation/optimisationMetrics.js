export function createOptimisationMetrics({
  efficiency,
  recommendations,
  workload,
}) {
  return Object.freeze({
    efficiency,
    recommendations: recommendations.length,
    balancedQueues: workload.balanced,
    averageQueueDepth: Math.round(workload.averageDepth),
  });
}
