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
  'workspaces/staffology/leave'
);

[
  'leaveFields.js',
  'leaveResolver.js',
  'adaptStaffologyLeave.js',
  'leavePresentation.js',
  'leavePresentationModel.js',
  'LeaveTable.jsx',
  'LeaveSection.jsx',
  'StaffologyLeavePanel.jsx',
  'leave.css',
  'index.js',
].forEach((file) => {
  assert.ok(
    fs.existsSync(path.join(base, file)),
    `Missing Leave workspace file: ${file}`
  );
});

console.log(
  'Staffology Leave Workspace verification passed'
);
