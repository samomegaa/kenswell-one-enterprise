'use strict';

const path = require('path');

const {
  assert,
  operationById,
} = require('../shared/assertions');

const {
  pass,
} = require('../shared/result');

module.exports = function verifyStaffologyCatalogue(
  root
) {
  const cataloguePath = path.join(
    root,
    'review/1.2/RC2/D/contracts/' +
    'staffology-api-catalogue'
  );

  delete require.cache[
    require.resolve(cataloguePath)
  ];

  const catalogue = require(cataloguePath);

  assert.strictEqual(
    catalogue.operations.length,
    11,
    'Unexpected Staffology operation count'
  );

  const workspace = operationById(
    catalogue.operations,
    'employees.workspace'
  );

  assert.strictEqual(
    workspace.status,
    catalogue.STATUS.VERIFIED
  );

  operationById(
    catalogue.operations,
    'employees.pay-options'
  );

  return pass(
    'Staffology catalogue',
    `${catalogue.operations.length} operations`
  );
};
