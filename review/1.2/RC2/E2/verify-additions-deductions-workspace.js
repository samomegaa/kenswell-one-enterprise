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
  'workspaces/staffology/pay-options/' +
  'additions-deductions'
);

const required = [
  'additionFields.js',
  'deductionFields.js',
  'collectionResolver.js',
  'itemResolver.js',
  'adaptPayItem.js',
  'adaptStaffologyAdditionsDeductions.js',
  'PayItemTable.jsx',
  'PayItemSection.jsx',
  'StaffologyAdditionsDeductionsPanel.jsx',
  'additions-deductions.css',
  'index.js',
];

required.forEach((file) => {
  assert.ok(
    fs.existsSync(path.join(base, file)),
    `Missing Additions & Deductions file: ${file}`
  );
});

console.log(
  'Staffology Additions & Deductions Workspace verification passed'
);
