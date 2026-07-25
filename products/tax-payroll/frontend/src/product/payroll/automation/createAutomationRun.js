export function createAutomationRun(rule, command) {
  return Object.freeze({
    id: crypto.randomUUID(),
    ruleId: rule.id,
    ruleLabel: rule.label,
    commandType: rule.commandType,
    commandId: command?.id || null,
    status: command ? 'command-created' : 'matched',
    createdAt: new Date().toISOString(),
  });
}
