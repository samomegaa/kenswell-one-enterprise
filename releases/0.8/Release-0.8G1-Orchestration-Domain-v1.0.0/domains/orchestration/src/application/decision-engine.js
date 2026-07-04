function getByPath(object, path) {
  return String(path || '')
    .split('.')
    .filter(Boolean)
    .reduce((current, key) => current?.[key], object);
}

export function evaluateOrchestrationDecision(decision, context = {}) {
  const actual = getByPath(context, decision.field);

  let matched = false;

  switch (decision.operator) {
    case 'NOT_EQUALS':
      matched = actual !== decision.value;
      break;

    case 'CONTAINS':
      matched = Array.isArray(actual)
        ? actual.includes(decision.value)
        : String(actual || '').includes(String(decision.value));
      break;

    case 'EXISTS':
      matched = actual !== undefined && actual !== null && actual !== '';
      break;

    case 'GREATER_THAN':
      matched = Number(actual) > Number(decision.value);
      break;

    case 'LESS_THAN':
      matched = Number(actual) < Number(decision.value);
      break;

    case 'EQUALS':
    default:
      matched = actual === decision.value;
      break;
  }

  return {
    decisionId: decision.id,
    field: decision.field,
    operator: decision.operator,
    expected: decision.value,
    actual,
    matched,
    nextStepKey: matched ? decision.trueStepKey : decision.falseStepKey
  };
}

export function evaluateOrchestrationDecisions(decisions = [], context = {}) {
  return decisions.map(decision => evaluateOrchestrationDecision(decision, context));
}
