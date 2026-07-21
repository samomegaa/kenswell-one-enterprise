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
  'workspaces/staffology/pay-options/other'
);

const required = [
  'otherIdentityFields.js',
  'otherWorkingFields.js',
  'otherReportingFields.js',
  'otherFields.js',
  'otherResolver.js',
  'adaptStaffologyOther.js',
  'otherPresentation.js',
  'otherPresentationModel.js',
  'PayrollControlsSection.jsx',
  'WorkingArrangementSection.jsx',
  'ReportingIndicatorsSection.jsx',
  'StaffologyOtherPanel.jsx',
  'other.css',
  'index.js',
];

required.forEach((file) => {
  assert.ok(
    fs.existsSync(path.join(base, file)),
    `Missing Other workspace file: ${file}`
  );
});

const panel = fs.readFileSync(
  path.join(base, 'StaffologyOtherPanel.jsx'),
  'utf8'
);

assert.ok(
  panel.includes("from '../../../framework'"),
  'Other panel framework import is incorrect'
);

console.log(
  'Staffology Other Pay Options Workspace verification passed'
);
