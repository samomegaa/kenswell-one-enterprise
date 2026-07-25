export function createExecutionPlanFromRunbook(runbook) {
  return Object.freeze({
    id: crypto.randomUUID(),
    runbookId: runbook.id,
    title: runbook.title,
    steps: runbook.steps.map((label, index) => ({
      label,
      commandType:
        index === runbook.steps.length - 1
          ? runbook.commandType
          : null,
      dependsOn:
        index === 0
          ? []
          : [`pending:${index}`],
      waitForApproval:
        /approval|command/i.test(label),
      retryable:
        /refresh|retry|resume/i.test(label),
    })),
    createdAt: new Date().toISOString(),
  });
}
