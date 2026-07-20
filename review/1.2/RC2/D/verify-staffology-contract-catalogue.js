'use strict';

const assert = require('assert');

const catalogue = require(
  './contracts/staffology-api-catalogue'
);

const ids = catalogue.operations.map(
  (operation) => operation.id
);

assert.strictEqual(
  catalogue.operations.length,
  11,
  'Expected 11 Staffology operations'
);

assert.strictEqual(
  catalogue.operations.filter(
    (operation) =>
      operation.status === catalogue.STATUS.VERIFIED
  ).length,
  5,
  'Expected five verified operations'
);

assert.strictEqual(
  catalogue.operations.filter(
    (operation) =>
      operation.status === catalogue.STATUS.PLANNED
  ).length,
  6,
  'Expected six planned operations'
);

[
  'employers.list',
  'employees.workspace',
  'employees.pay-options',
  'employees.bank-account',
  'employees.leave',
  'employees.pension',
  'employees.notes',
].forEach((id) => {
  assert.ok(
    ids.includes(id),
    `Missing catalogue operation: ${id}`
  );
});

console.log(
  'Staffology API Contract Catalogue verification passed'
);
