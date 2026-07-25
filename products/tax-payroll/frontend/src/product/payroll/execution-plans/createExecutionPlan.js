export function createExecutionPlan({
  source,
  scheduleId,
  workflowId,
  runbook,
}) {
  return Object.freeze({
    id: crypto.randomUUID(),
    source,
    scheduleId: scheduleId || null,
    workflowId: workflowId || null,
    runbookId: runbook.id,
    runbookTitle: runbook.title,
    commandType: runbook.commandType,
    status: 'planned',
    createdAt: new Date().toISOString(),
  });
}
