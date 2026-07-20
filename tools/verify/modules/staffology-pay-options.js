'use strict';

const {
  includesAll,
} = require('../shared/assertions');

const {
  readFile,
  requireFile,
} = require('../shared/files');

const {
  pass,
} = require('../shared/result');

module.exports = function verifyPayOptions(root) {
  const reviewBase =
    'review/1.2/RC2/E0/';

  requireFile(
    root,
    reviewBase +
      'catalogue/regular-pay-discovery.json'
  );

  const base =
    'products/tax-payroll/frontend/src/' +
    'workspaces/staffology/pay-options/';

  const workspace = readFile(
    root,
    base + 'StaffologyPayOptionsWorkspace.jsx'
  );

  const adapter = readFile(
    root,
    base + 'adaptStaffologyRegularPay.js'
  );

  const fields = readFile(
    root,
    base + 'regularPayFields.js'
  );

  includesAll(
    workspace,
    [
      'PayOptionsNavigation',
      'StaffologyRegularPayPanel',
      'PayOptionReserved',
    ],
    'Pay Options workspace'
  );

  includesAll(
    adapter,
    [
      'createContractIndex',
      'firstContractValue',
      'REGULAR_PAY_FIELDS',
    ],
    'Regular Pay adapter'
  );

  includesAll(
    fields,
    [
      'annualSalary',
      'regularPay',
      'hourlyRate',
      'workingPattern',
      'payrollCode',
    ],
    'Regular Pay fields'
  );

  return pass(
    'Staffology Pay Options',
    'Regular Pay workspace connected'
  );
};
