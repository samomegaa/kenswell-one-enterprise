export function assessDecisionReadiness({
  policyOutcome,
  confidence,
  risk,
}) {
  if (policyOutcome === 'block') {
    return {
      ready: false,
      reason: 'Adaptive policy blocked execution',
    };
  }

  if (confidence < 50) {
    return {
      ready: false,
      reason: 'Decision confidence below threshold',
    };
  }

  if (risk >= 80) {
    return {
      ready: false,
      reason: 'Operational risk requires escalation',
    };
  }

  return {
    ready: true,
    reason: 'Decision evidence is sufficient',
  };
}
