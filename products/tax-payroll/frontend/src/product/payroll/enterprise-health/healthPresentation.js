export function presentEnterpriseHealth(health) {
  return {
    label:
      health.status === 'healthy'
        ? 'Healthy'
        : health.status === 'attention'
          ? 'Attention required'
          : 'Critical',
    scoreLabel: `${health.score}%`,
    summary:
      health.status === 'healthy'
        ? 'Enterprise operations are within target.'
        : 'Enterprise intervention is recommended.',
  };
}
