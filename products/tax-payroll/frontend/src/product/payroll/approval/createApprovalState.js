export function createApprovalState(pipeline) {
  return Object.freeze({
    pipelineId: pipeline?.id || null,
    status: 'pending',
    decision: null,
    decidedBy: null,
    decidedAt: null,
    notes: '',
  });
}
