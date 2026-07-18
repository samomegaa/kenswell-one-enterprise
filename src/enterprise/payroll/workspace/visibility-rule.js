'use strict';

const {
  VISIBILITY_OPERATOR_LIST,
} = require('./visibility-operators');

function createVisibilityRule(input = {}) {
  const field = String(input.field || '').trim();
  const operator = String(
    input.operator || 'equals'
  );

  if (!field) {
    throw new TypeError(
      'Visibility rule field is required'
    );
  }

  if (!VISIBILITY_OPERATOR_LIST.includes(operator)) {
    throw new TypeError(
      `Unsupported visibility operator "${operator}"`
    );
  }

  return Object.freeze({
    field,
    operator,
    value: input.value,
  });
}

function normaliseVisibilityRules(rules = []) {
  return Object.freeze(
    (rules || []).map(createVisibilityRule)
  );
}

module.exports = {
  createVisibilityRule,
  normaliseVisibilityRules,
};
