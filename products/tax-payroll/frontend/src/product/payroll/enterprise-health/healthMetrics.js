export function normaliseHealthMetric(value) {
  return Math.max(0, Math.min(100, Number(value) || 0));
}

export function createHealthMetrics(input) {
  return {
    runtime: normaliseHealthMetric(input.runtime),
    orchestration: normaliseHealthMetric(input.orchestration),
    automation: normaliseHealthMetric(input.automation),
    decision: normaliseHealthMetric(input.decision),
    prediction: normaliseHealthMetric(input.prediction),
    recovery: normaliseHealthMetric(input.recovery),
    efficiency: normaliseHealthMetric(input.efficiency),
    compliance: normaliseHealthMetric(input.compliance),
  };
}
