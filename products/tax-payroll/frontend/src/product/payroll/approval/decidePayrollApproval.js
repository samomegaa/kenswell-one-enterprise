export function decidePayrollApproval(
  current,
  decision,
  actor = 'current-user',
  notes = ''
) {
  if (!['approved', 'rejected'].includes(decision)) {
    throw new Error(`Unsupported approval decision: ${decision}`);
  }

  return Object.freeze({
    ...current,
    status: decision,
    decision,
    decidedBy: actor,
    decidedAt: new Date().toISOString(),
    notes,
  });
}
