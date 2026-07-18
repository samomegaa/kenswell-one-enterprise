'use strict';

const VISIBILITY_OPERATORS = Object.freeze({
  EQUALS: 'equals',
  NOT_EQUALS: 'not-equals',
  TRUTHY: 'truthy',
  FALSY: 'falsy',
  IN: 'in',
  NOT_IN: 'not-in',
  EXISTS: 'exists',
  NOT_EXISTS: 'not-exists',
});

const VISIBILITY_OPERATOR_LIST = Object.freeze(
  Object.values(VISIBILITY_OPERATORS)
);

module.exports = {
  VISIBILITY_OPERATORS,
  VISIBILITY_OPERATOR_LIST,
};
