export function createCommand({
  type,
  label,
  correlationId,
  requiresApproval,
}) {
  return Object.freeze({
    id: crypto.randomUUID(),
    type,
    label,
    correlationId: correlationId || null,
    requiresApproval,
    status: requiresApproval
      ? 'awaiting-approval'
      : 'approved',
    createdAt: new Date().toISOString(),
    approvedAt: null,
    completedAt: null,
    error: null,
  });
}
