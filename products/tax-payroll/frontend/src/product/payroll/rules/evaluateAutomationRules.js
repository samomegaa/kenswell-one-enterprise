export function evaluateAutomationRules(rules, snapshot, sla) {
  return rules.map((rule) => Object.freeze({
    ...rule,
    matched: rule.enabled && matches(rule.trigger, snapshot, sla),
    evaluatedAt: new Date().toISOString(),
  }));
}

function matches(trigger, snapshot, sla) {
  switch (trigger) {
    case 'submission-failed':
      return snapshot?.submission?.status === 'failed';
    case 'submission-rejected':
      return snapshot?.submission?.status === 'rejected';
    case 'payroll-completed':
      return snapshot?.completion?.completion?.status === 'completed';
    case 'sla-breached':
      return sla?.breached === true;
    default:
      return false;
  }
}
