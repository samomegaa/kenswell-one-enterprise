export function balanceWorkload(queues = []) {
  const total = queues.reduce(
    (sum, queue) => sum + (queue.depth || 0),
    0
  );

  if (queues.length === 0) {
    return { balanced: true, averageDepth: 0, recommendations: [] };
  }

  const averageDepth = total / queues.length;
  const recommendations = queues
    .filter((queue) => queue.depth > averageDepth * 1.5)
    .map((queue) => ({
      queueId: queue.id,
      action: 'rebalance-queue',
      reason: 'Queue depth exceeds balanced threshold',
    }));

  return {
    balanced: recommendations.length === 0,
    averageDepth,
    recommendations,
  };
}
