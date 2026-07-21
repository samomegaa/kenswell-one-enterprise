'use strict';
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const root = path.resolve(__dirname, '../../../../');
const base = path.join(root, 'products/tax-payroll/frontend/src/workspaces/staffology/pay-options/tax-ni');
const required = [
  'taxNiPresentation.js',
  'taxNiPresentationModel.js',
  'StaffologyTaxNiPanel.jsx',
  'TaxDetailsSection.jsx',
  'NationalInsuranceSection.jsx',
  'LoanIndicatorsSection.jsx',
];
required.forEach((file) => {
  assert.ok(fs.existsSync(path.join(base, file)), `Missing Tax & NI alignment file: ${file}`);
});
const presentation = fs.readFileSync(path.join(base, 'taxNiPresentation.js'), 'utf8');
assert.ok(presentation.includes("'Cumulative'"), 'Cumulative tax basis presentation missing');
assert.ok(presentation.includes("'Week 1 / Month 1'"), 'Week 1 / Month 1 presentation missing');
console.log('Staffology Tax & NI Contract Alignment verification passed');
