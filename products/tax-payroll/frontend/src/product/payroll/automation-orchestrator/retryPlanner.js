export function createRetryPlan(node, attempts = 0) {
  const nextAttempt = attempts + 1;
  const delaySeconds = Math.min(300, 2 ** nextAttempt * 5);

  return Object.freeze({
    nodeId: node.id,
    attempt: nextAttempt,
    delaySeconds,
    eligible: Boolean(node.retryable) && nextAttempt <= 3,
  });
}
