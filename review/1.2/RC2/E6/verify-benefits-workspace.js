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
  'workspaces/staffology/pay-options/benefits'
);

const required = [
  'benefitFields.js',
  'benefitCollectionResolver.js',
  'benefitItemResolver.js',
  'adaptBenefitItem.js',
  'adaptStaffologyBenefits.js',
  'benefitPresentation.js',
  'benefitPresentationModel.js',
  'BenefitTable.jsx',
  'BenefitSection.jsx',
  'StaffologyBenefitsPanel.jsx',
  'benefits.css',
  'index.js',
];

required.forEach((file) => {
  assert.ok(
    fs.existsSync(path.join(base, file)),
    `Missing Benefits workspace file: ${file}`
  );
});

const panel = fs.readFileSync(
  path.join(base, 'StaffologyBenefitsPanel.jsx'),
  'utf8'
);

assert.ok(
  panel.includes("from '../../../framework'"),
  'Benefits panel framework import is incorrect'
);

console.log(
  'Staffology Benefits Workspace verification passed'
);
