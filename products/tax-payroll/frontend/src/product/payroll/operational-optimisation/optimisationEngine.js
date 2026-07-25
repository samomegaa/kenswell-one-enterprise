import { calculateEfficiencyScore } from './efficiencyScoring';
import { createOptimisationMetrics } from './optimisationMetrics';
import {
  buildOptimisationRecommendations,
} from './optimisationRecommendations';
import { balanceWorkload } from './workloadBalancer';

export function createOptimisationAssessment(input) {
  const efficiency = calculateEfficiencyScore(input);
  const workload = balanceWorkload(input.queues);
  const recommendations = buildOptimisationRecommendations({
    efficiency,
    workload,
    forecast: input.forecast,
  });

  return Object.freeze({
    id: crypto.randomUUID(),
    efficiency,
    workload,
    recommendations,
    metrics: createOptimisationMetrics({
      efficiency,
      recommendations,
      workload,
    }),
    status: recommendations.length > 0
      ? 'review-required'
      : 'ready',
    createdAt: new Date().toISOString(),
  });
}
