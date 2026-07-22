'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(
  __dirname,
  '../../../../'
);

const staffology = path.join(
  root,
  'products/tax-payroll/frontend/src/' +
  'workspaces/staffology'
);

[
  'StaffologyWorkspaceState.jsx',
  'StaffologySectionPending.jsx',
  'staffology-employee-workspace.css',
  'attachment-orders/StaffologyAttachmentOrdersPanel.jsx',
  'bank-account/StaffologyBankAccountPanel.jsx',
  'leave/StaffologyLeavePanel.jsx',
  'pension/StaffologyPensionPanel.jsx',
].forEach((file) => {
  assert.ok(
    fs.existsSync(path.join(staffology, file)),
    `Missing F6 integration file: ${file}`
  );
});

[
  'attachment-orders/StaffologyAttachmentOrdersPanel.jsx',
  'bank-account/StaffologyBankAccountPanel.jsx',
  'leave/StaffologyLeavePanel.jsx',
  'pension/StaffologyPensionPanel.jsx',
].forEach((file) => {
  const source = fs.readFileSync(
    path.join(staffology, file),
    'utf8'
  );

  assert.ok(
    source.includes('StaffologyWorkspaceState'),
    `Shared state component missing from ${file}`
  );
});

console.log(
  'Employee Administration Integration & Polish verification passed'
);
