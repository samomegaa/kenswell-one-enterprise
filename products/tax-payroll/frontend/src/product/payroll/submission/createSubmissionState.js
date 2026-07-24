export function createSubmissionState(pipeline) {
  return Object.freeze({
    pipelineId: pipeline?.id || null,
    status: 'idle',
    attempts: 0,
    providerReference: null,
    lastResult: null,
    updatedAt: new Date().toISOString(),
  });
}
