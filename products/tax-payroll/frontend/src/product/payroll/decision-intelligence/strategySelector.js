export function selectStrategy({
  policyDecision,
  readiness,
  risk,
}) {
  if (!readiness.ready && risk >= 80) {
    return 'escalate';
  }

  if (policyDecision.outcome === 'block') {
    return 'pause';
  }

  return policyDecision.strategy || 'observe';
}
