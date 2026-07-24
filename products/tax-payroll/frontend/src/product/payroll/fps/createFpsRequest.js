export function createFpsRequest({
  pipeline,
  approval,
  employer,
  period,
}) {
  if (!pipeline?.id || approval?.status !== 'approved') {
    return null;
  }

  return Object.freeze({
    id: `fps:${pipeline.id}`,
    pipelineId: pipeline.id,
    employerId: employer?.id || pipeline.employerId,
    periodId: period?.id || pipeline.periodId,
    status: 'prepared',
    provider: 'staffology',
    correlationId: crypto.randomUUID(),
    preparedAt: new Date().toISOString(),
  });
}
