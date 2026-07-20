'use strict';

const identity = require(
  './regular-pay-identity-fields'
);

const amounts = require(
  './regular-pay-amount-fields'
);

const patterns = require(
  './regular-pay-pattern-fields'
);

const fields = Object.freeze({
  ...identity,
  ...amounts,
  ...patterns,
});

module.exports = Object.freeze({
  id: 'staffology.regular-pay',
  domain: 'pay-options',
  access: 'read',
  status: 'discovery',
  fields,
});
