'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '../../../../');
const base = path.join(
  root,
  'products/tax-payroll/frontend/src/workspaces/staffology/pay-options/tax-ni'
);

[
  'taxNiFields.js',
  'taxNiResolver.js',
  'adaptStaffologyTaxNi.js',
  'taxNiFormatters.js',
  'StaffologyTaxNiPanel.jsx',
  'tax-ni.css',
  'index.js',
].forEach((file) => {
  assert.ok(fs.existsSync(path.join(base, file)), `Missing Tax & NI file: ${file}`);
});

const panel = fs.readFileSync(path.join(base, 'StaffologyTaxNiPanel.jsx'), 'utf8');
assert.ok(panel.includes("from '../../../framework'"), 'Framework import is incorrect');

console.log('Staffology Tax & NI Workspace verification passed');
