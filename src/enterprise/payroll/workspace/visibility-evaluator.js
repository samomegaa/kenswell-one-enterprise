'use strict';

const {
  VISIBILITY_OPERATORS,
} = require('./visibility-operators');

const {
  getValueAtPath,
} = require('./value-accessor');

function exists(value) {
  return value !== null && value !== undefined;
}

function evaluateVisibilityRule(
  rule,
  employee = {}
) {
  const actual = getValueAtPath(
    employee,
    rule.field
  );

  switch (rule.operator) {
    case VISIBILITY_OPERATORS.EQUALS:
      return actual === rule.value;

    case VISIBILITY_OPERATORS.NOT_EQUALS:
      return actual !== rule.value;

    case VISIBILITY_OPERATORS.TRUTHY:
      return Boolean(actual);

    case VISIBILITY_OPERATORS.FALSY:
      return !actual;

    case VISIBILITY_OPERATORS.IN:
      return Array.isArray(rule.value) &&
        rule.value.includes(actual);

    case VISIBILITY_OPERATORS.NOT_IN:
      return Array.isArray(rule.value) &&
        !rule.value.includes(actual);

    case VISIBILITY_OPERATORS.EXISTS:
      return exists(actual);

    case VISIBILITY_OPERATORS.NOT_EXISTS:
      return !exists(actual);

    default:
      return false;
  }
}

function evaluateVisibilityRules(
  rules = [],
  employee = {},
  mode = 'all'
) {
  if (!rules || rules.length === 0) {
    return true;
  }

  if (mode === 'any') {
    return rules.some((rule) =>
      evaluateVisibilityRule(rule, employee)
    );
  }

  return rules.every((rule) =>
    evaluateVisibilityRule(rule, employee)
  );
}

module.exports = {
  evaluateVisibilityRule,
  evaluateVisibilityRules,
};
