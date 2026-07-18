import {
  getPathValue,
} from '../editing/workspaceDraftValues';

function evaluateOperator(
  actual,
  operator,
  expected
) {
  const operations = {
    equals: () => actual === expected,
    'not-equals': () => actual !== expected,
    truthy: () => Boolean(actual),
    falsy: () => !actual,
    in: () =>
      Array.isArray(expected) &&
      expected.includes(actual),
    'not-in': () =>
      Array.isArray(expected) &&
      !expected.includes(actual),
    exists: () =>
      actual !== null &&
      actual !== undefined,
    'not-exists': () =>
      actual === null ||
      actual === undefined,
  };

  return (
    operations[operator] ||
    (() => true)
  )();
}

export function isFieldVisible(
  field,
  values
) {
  const rules =
    field.visibleWhen ||
    field.visibility?.rules ||
    [];

  if (!rules.length) return true;

  const mode =
    field.visibility?.mode || 'all';

  const results = rules.map((rule) =>
    evaluateOperator(
      getPathValue(values, rule.path),
      rule.operator,
      rule.value
    )
  );

  return mode === 'any'
    ? results.some(Boolean)
    : results.every(Boolean);
}
