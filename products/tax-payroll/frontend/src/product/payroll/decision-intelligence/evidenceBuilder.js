export function buildDecisionEvidence({
  operations,
  orchestration,
  command,
}) {
  const signals = [];

  if (operations?.submissionRejected) {
    signals.push('submission-rejected');
  }

  if ((orchestration?.retryCount || 0) >= 3) {
    signals.push('retry-limit-reached');
  }

  if (operations?.slaBreached) {
    signals.push('sla-breached');
  }

  if (operations?.completionReady) {
    signals.push('completion-ready');
  }

  return Object.freeze({
    signals,
    failedExecutions: orchestration?.failed || 0,
    retryCount: orchestration?.retryCount || 0,
    slaBreached: Boolean(operations?.slaBreached),
    submissionRejected: Boolean(
      operations?.submissionRejected
    ),
    approvalPending: Boolean(command?.approvalPending),
    completeness: 0.9,
    policyConflicts: 0,
  });
}
