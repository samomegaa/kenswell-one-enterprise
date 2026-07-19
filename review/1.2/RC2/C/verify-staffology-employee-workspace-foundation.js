'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(
  __dirname,
  '../../../..'
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

const contract = read(
  'products/tax-payroll/frontend/src/' +
  'workspaces/staffology/' +
  'staffologyEmployeeWorkspaceContract.js'
);

const capabilities = read(
  'products/tax-payroll/frontend/src/' +
  'workspaces/staffology/' +
  'staffologyEmployeeCapabilities.js'
);

[
  'Basic Details',
  'Employment',
  'Pay Options',
  'Attachment Orders',
  'Bank Account',
  'Leave',
  'Pension',
  'Notes',
  'More',
].forEach((label) => {
  assert.ok(
    contract.includes(label),
    `Missing Staffology tab: ${label}`
  );
});

[
  'Regular Pay',
  'Additions & Deductions',
  'Loans',
  'Tax & NI',
  'Other',
  'Benefits',
].forEach((label) => {
  assert.ok(
    contract.includes(label),
    `Missing Pay Options section: ${label}`
  );
});

[
  'Settings',
  'Assessments',
  'Refunds',
].forEach((label) => {
  assert.ok(
    contract.includes(label),
    `Missing Pension section: ${label}`
  );
});

[
  'AVAILABLE',
  'PARTIAL',
  'UNSUPPORTED',
  'UNKNOWN',
].forEach((state) => {
  assert.ok(
    capabilities.includes(state),
    `Missing capability state: ${state}`
  );
});

console.log(
  'PASS Staffology primary tabs'
);

console.log(
  'PASS Pay Options subsections'
);

console.log(
  'PASS Pension subsections'
);

console.log(
  'PASS Staffology capability model'
);

console.log(
  'Staffology Employee Workspace Foundation verification passed'
);
