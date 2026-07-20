'use strict';

const path = require('path');

const {
  assert,
} = require('../shared/assertions');

const {
  requireFile,
} = require('../shared/files');

const {
  pass,
} = require('../shared/result');

module.exports = function verifyPayOptions(root) {
  const base = 'review/1.2/RC2/E0/';

  const contractPath = requireFile(
    root,
    base + 'contracts/regular-pay-contract.js'
  );

  const discoveryPath = requireFile(
    root,
    base + 'catalogue/regular-pay-discovery.json'
  );

  requireFile(
    root,
    base + 'catalogue/regular-pay-coverage.md'
  );

  const contract = require(contractPath);
  const discovery = require(discoveryPath);

  assert.strictEqual(
    contract.id,
    'staffology.regular-pay'
  );

  assert.strictEqual(
    discovery.fields.length,
    Object.keys(contract.fields).length
  );

  return pass(
    'Staffology Pay Options',
    `${discovery.fields.length} Regular Pay fields catalogued`
  );
};
