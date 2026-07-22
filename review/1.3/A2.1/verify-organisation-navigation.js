'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '../../../');
const frontend = path.join(
  root,
  'products/tax-payroll/frontend/src'
);

const provider = fs.readFileSync(
  path.join(
    frontend,
    'workspaces/providers/EnterpriseProviderCentre.jsx'
  ),
  'utf8'
);

[
  'StaffologyOrganisationWorkspace',
  'organisationOpen',
  'Open organisation workspace',
  'organisation-launch-panel',
  'StaffologyEmployeeWorkspace',
  'EmployeeList',
].forEach((token) => {
  assert.ok(
    provider.includes(token),
    `Missing integration token: ${token}`
  );
});

const main = fs.readFileSync(
  path.join(frontend, 'main.jsx'),
  'utf8'
);

assert.ok(
  main.includes('organisation-navigation-integration.css'),
  'Organisation navigation CSS import missing'
);

console.log(
  'Organisation Navigation Integration verification passed'
);
