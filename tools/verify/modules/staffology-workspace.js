'use strict';

const {
  includesAll,
} = require('../shared/assertions');

const {
  readFile,
} = require('../shared/files');

const {
  pass,
} = require('../shared/result');

module.exports = function verifyStaffologyWorkspace(
  root
) {
  const base =
    'products/tax-payroll/frontend/src/' +
    'workspaces/staffology/';

  const contract = readFile(
    root,
    base + 'staffologyEmployeeWorkspaceContract.js'
  );

  const workspace = readFile(
    root,
    base + 'StaffologyEmployeeWorkspace.jsx'
  );

  includesAll(
    contract,
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
    ],
    'Staffology workspace contract'
  );

  includesAll(
    workspace,
    [
      'StaffologyBasicDetailsPanel',
      'StaffologyEmploymentPanel',
      'StaffologyEmploymentPanel',
    ],
    'Staffology employee workspace'
  );

  return pass(
    'Staffology workspace',
    'Basic Details and Employment connected'
  );
};
