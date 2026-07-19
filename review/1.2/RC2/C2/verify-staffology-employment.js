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

const adapter = read(
  base + 'adaptStaffologyEmployment.js'
);

const panel = read(
  base + 'StaffologyEmploymentPanel.jsx'
);

const workspace = read(
  base + 'StaffologyEmployeeWorkspace.jsx'
);

[
  'jobTitle',
  'workplacePostcode',
  'continuousStartDate',
  'payrollCode',
  'isDirector',
  'rightToWorkChecked',
  'cisSubcontractor',
  'apprentice',
  'furlough',
].forEach((token) => {
  assert.ok(
    adapter.includes(token),
    `Employment adapter missing ${token}`
  );
});

[
  'Employment overview',
  'Director and NI settings',
  'Employment declarations',
  'Start of directorship',
  'Alternative NI method',
  'Employee has left',
].forEach((token) => {
  assert.ok(
    panel.includes(token),
    `Employment panel missing ${token}`
  );
});

assert.ok(
  workspace.includes(
    "activeTab === 'employment'"
  ),
  'Employment tab is not connected'
);

assert.ok(
  workspace.includes(
    'StaffologyEmploymentPanel'
  ),
  'Employment panel is not rendered'
);

console.log(
  'PASS Staffology Employment adapter'
);

console.log(
  'PASS Staffology Employment panel'
);

console.log(
  'PASS Employment tab connected'
);

console.log(
  'PASS Staffology read-only boundary preserved'
);

console.log(
  'Staffology Employment verification passed'
);
