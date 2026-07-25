export function calculateRisk(evidence) {
  let score = 0;

  score += (evidence.failedExecutions || 0) * 20;
  score += (evidence.retryCount || 0) * 15;
  score += evidence.slaBreached ? 30 : 0;
  score += evidence.submissionRejected ? 35 : 0;
  score += evidence.approvalPending ? 10 : 0;

  return Math.min(100, score);
}
