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
  'StaffologyPayOptionsWorkspace.jsx',
  'StaffologyRegularPayPanel.jsx',
  'PayOptionsNavigation.jsx',
  'PayOptionReserved.jsx',
  'adaptStaffologyRegularPay.js',
  'regularPayFields.js',
  'regularPayFormatters.js',
  'payOptionSections.js',
  'staffology-pay-options.css',
  'index.js',
];

required.forEach((file) => {
  assert.ok(
    fs.existsSync(path.join(base, file)),
    `Missing Pay Options file: ${file}`
  );
});

const sections = fs.readFileSync(
  path.join(base, 'payOptionSections.js'),
  'utf8'
);

[
  'Regular Pay',
  'Additions & Deductions',
  'Loans',
  'Tax & NI',
  'Other',
  'Benefits',
].forEach((label) => {
  assert.ok(
    sections.includes(label),
    `Missing Pay Options section: ${label}`
  );
});

console.log(
  'Staffology Regular Pay Workspace verification passed'
);
