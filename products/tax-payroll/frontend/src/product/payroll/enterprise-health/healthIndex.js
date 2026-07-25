import { createHealthMetrics } from './healthMetrics';

const WEIGHTS = Object.freeze({
  runtime: 0.15,
  orchestration: 0.15,
  automation: 0.1,
  decision: 0.1,
  prediction: 0.1,
  recovery: 0.15,
  efficiency: 0.15,
  compliance: 0.1,
});

export function calculateEnterpriseHealth(input) {
  const metrics = createHealthMetrics(input);
  const score = Object.entries(WEIGHTS).reduce(
    (total, [key, weight]) => total + metrics[key] * weight,
    0
  );

  return Object.freeze({
    score: Math.round(score),
    metrics,
    status:
      score >= 80 ? 'healthy' :
      score >= 60 ? 'attention' :
      'critical',
  });
}
