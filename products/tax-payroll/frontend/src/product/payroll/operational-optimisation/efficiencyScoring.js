export function calculateEfficiencyScore({
  throughput = 0,
  queueDepth = 0,
  retryCount = 0,
  approvalLatency = 0,
}) {
  const throughputScore = Math.min(40, throughput * 4);
  const queuePenalty = Math.min(25, queueDepth * 3);
  const retryPenalty = Math.min(20, retryCount * 5);
  const latencyPenalty = Math.min(15, approvalLatency);

  return Math.max(
    0,
    Math.min(
      100,
      60 + throughputScore -
        queuePenalty -
        retryPenalty -
        latencyPenalty
    )
  );
}
