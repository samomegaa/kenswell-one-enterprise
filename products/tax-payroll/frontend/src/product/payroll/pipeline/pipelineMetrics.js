export function getPipelineMetrics(pipeline) {
  const total = Number(pipeline?.total || 0);
  const processed = Number(pipeline?.processed || 0);
  return Object.freeze({
    total, processed, remaining: Math.max(total - processed, 0),
    completion: total ? Math.min(Math.round((processed / total) * 100), 100) : 0,
    health: pipeline?.status === 'failed' ? 'attention' : 'healthy',
  });
}
