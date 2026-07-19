'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(
  __dirname,
  '../../../../'
);

function read(relativePath) {
  const absolutePath = path.join(
    root,
    relativePath
  );

  assert.ok(
    fs.existsSync(absolutePath),
    `Missing file: ${relativePath}`
  );

  return fs.readFileSync(
    absolutePath,
    'utf8'
  );
}

const base =
  'products/tax-payroll/frontend/src/' +
  'workspaces/staffology/';

const providerCentre = read(
  'products/tax-payroll/frontend/src/' +
  'workspaces/providers/' +
  'EnterpriseProviderCentre.jsx'
);

const adapter = read(
  base + 'adaptStaffologyBasicDetails.js'
);

const panel = read(
  base + 'StaffologyBasicDetailsPanel.jsx'
);

const workspace = read(
  base + 'StaffologyEmployeeWorkspace.jsx'
);

assert.match(
  providerCentre,
  /StaffologyEmployeeWorkspace/,
  'Provider Centre does not use Staffology workspace'
);

[
  'personalDetails.firstName',
  'personalDetails.dateOfBirth',
  'personalDetails.niNumber',
  'personalDetails.address',
].forEach((token) => {
  assert.ok(
    adapter.includes(token),
    `Adapter missing ${token}`
  );
});

[
  'Personal information',
  'Contact information',
  'Address',
  'NI number',
].forEach((token) => {
  assert.ok(
    panel.includes(token),
    `Basic Details panel missing ${token}`
  );
});

[
  'STAFFOLOGY_EMPLOYEE_TABS',
  'Staffology payroll employee',
  'Read only',
].forEach((token) => {
  assert.ok(
    workspace.includes(token),
    `Workspace missing ${token}`
  );
});

console.log(
  'PASS Staffology workspace activated'
);

console.log(
  'PASS Staffology Basic Details adapter'
);

console.log(
  'PASS Staffology Basic Details panel'
);

console.log(
  'PASS Staffology read-only boundary'
);

console.log(
  'Staffology Basic Details verification passed'
);
