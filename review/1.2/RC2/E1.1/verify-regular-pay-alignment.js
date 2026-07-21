'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(
  __dirname,
  '../../../../'
);

const base = path.join(
  root,
  'products/tax-payroll/frontend/src/' +
  'workspaces/staffology/pay-options'
);

const required = [
  'regularPayScheduleFields.js',
  'regularPayAmountFields.js',
  'regularPaySettingsFields.js',
  'regularPayFields.js',
  'regularPayResolver.js',
  'adaptStaffologyRegularPay.js',
  'StaffologyRegularPayPanel.jsx',
];

required.forEach((file) => {
  assert.ok(
    fs.existsSync(path.join(base, file)),
    `Missing alignment file: ${file}`
  );
});

const fields = fs.readFileSync(
  path.join(base, 'regularPayFields.js'),
  'utf8'
);

assert.ok(
  !fields.includes("'grossPay'"),
  'Broad grossPay alias must not be used'
);

assert.ok(
  !fields.includes("'code'"),
  'Broad code alias must not be used'
);

console.log(
  'Staffology Regular Pay Contract Alignment verification passed'
);
