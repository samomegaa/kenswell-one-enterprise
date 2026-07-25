export function buildOptimisationRecommendations({
  efficiency,
  workload,
  forecast,
}) {
  const recommendations = [];

  if (efficiency < 60) {
    recommendations.push({
      id: 'improve-throughput',
      action: 'prioritise-work',
      reason: 'Operational efficiency is below target',
    });
  }

  recommendations.push(...workload.recommendations);

  if (forecast?.slaRisk >= 70) {
    recommendations.push({
      id: 'early-approval',
      action: 'request-approval',
      reason: 'Forecast indicates elevated SLA risk',
    });
  }

  return recommendations;
}
