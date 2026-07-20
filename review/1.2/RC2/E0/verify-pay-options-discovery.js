'use strict';

const assert = require('assert');

const domains = require(
  './contracts/pay-options-domains'
);

const contract = require(
  './contracts/regular-pay-contract'
);

const discovery = require(
  './catalogue/regular-pay-discovery.json'
);

assert.strictEqual(
  domains.length,
  6,
  'Expected six Pay Options domains'
);

assert.strictEqual(
  Object.keys(contract.fields).length,
  12,
  'Expected twelve Regular Pay fields'
);

assert.strictEqual(
  discovery.fields.length,
  12,
  'Discovery coverage is incomplete'
);

assert.ok(
  discovery.fields.every(
    (field) =>
      ['discovered', 'unresolved']
        .includes(field.status)
  ),
  'Invalid discovery field state'
);

console.log(
  'Staffology Pay Options Contract Discovery verification passed'
);
