export function createOrchestrationGraph(plan) {
  const steps = plan.steps || [];

  return Object.freeze({
    id: crypto.randomUUID(),
    planId: plan.id,
    nodes: steps.map((step, index) => ({
      id: `${plan.id}:${index + 1}`,
      label: step.label,
      commandType: step.commandType || null,
      dependsOn: step.dependsOn || [],
      waitForApproval: Boolean(step.waitForApproval),
      status: index === 0 ? 'ready' : 'planned',
    })),
    createdAt: new Date().toISOString(),
  });
}
