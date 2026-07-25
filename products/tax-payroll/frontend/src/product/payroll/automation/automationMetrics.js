export function calculateAutomationMetrics({
  evaluations,
  history,
  sla,
}) {
  return Object.freeze({
    enabledRules:
      evaluations.filter((item) => item.enabled).length,
    matchedRules:
      evaluations.filter((item) => item.matched).length,
    commandsCreated:
      history.filter((item) => item.status === 'command-created').length,
    slaBreaches: sla.breached ? 1 : 0,
  });
}
