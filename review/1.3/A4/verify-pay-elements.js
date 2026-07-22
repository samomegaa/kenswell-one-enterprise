'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '../../../');
const base = path.join(
  root,
  'products/tax-payroll/frontend/src/' +
  'workspaces/staffology/organisation'
);

[
  'pay-elements/index.js',
  'pay-elements/payElementContract.js',
  'pay-elements/payElementResolver.js',
  'pay-elements/adaptStaffologyPayElements.js',
  'pay-elements/payElementPresentation.js',
  'pay-elements/payElementPresentationModel.js',
  'pay-elements/PayElementCard.jsx',
  'pay-elements/PayElementGroup.jsx',
  'pay-elements/StaffologyPayElementsWorkspace.jsx',
  'pay-elements/pay-elements.css',
].forEach((file) => {
  assert.ok(
    fs.existsSync(path.join(base, file)),
    `Missing A4 file: ${file}`
  );
});

const workspace = fs.readFileSync(
  path.join(
    base,
    'StaffologyOrganisationWorkspace.jsx'
  ),
  'utf8'
);

[
  'StaffologyPayElementsWorkspace',
  "id: 'pay-elements'",
  "label: 'Pay Elements'",
].forEach((token) => {
  assert.ok(
    workspace.includes(token),
    `Missing pay-elements token: ${token}`
  );
});

console.log(
  'Staffology Organisation Pay Elements verification passed'
);
