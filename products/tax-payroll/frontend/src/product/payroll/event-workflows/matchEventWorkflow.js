export function matchEventWorkflow(eventName, workflows) {
  return workflows.filter(
    (workflow) =>
      workflow.enabled &&
      workflow.eventName === eventName
  );
}
