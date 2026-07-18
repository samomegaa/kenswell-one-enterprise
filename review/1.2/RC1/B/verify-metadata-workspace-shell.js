#!/usr/bin/env node
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log(
  'RC1-B Metadata-Driven Workspace Shell'
);
console.log();

const root = path.resolve(
  __dirname,
  '../../../../products/tax-payroll/frontend/src'
);

function read(relative) {
  return fs.readFileSync(
    path.join(root, relative),
    'utf8'
  );
}

[
  'workspaces/employees/EnterpriseEmployeeWorkspace.jsx',
  'workspaces/employees/metadata/WorkspaceReadinessStrip.jsx',
  'workspaces/employees/metadata/WorkspaceSectionSummary.jsx',
].forEach((relative) => {
  assert(
    fs.existsSync(path.join(root, relative)),
    `${relative} is missing`
  );
});

console.log(
  'PASS  Enterprise workspace shell files'
);

const shell = read(
  'workspaces/employees/EnterpriseEmployeeWorkspace.jsx'
);

assert(
  shell.includes(
    'useEnterpriseEmployeeWorkspace'
  )
);

assert(
  shell.includes(
    'workspace.navigation'
  )
);

assert(
  !shell.includes('EMPLOYEE_SECTIONS')
);

console.log(
  'PASS  Metadata navigation source'
);

assert(
  shell.includes('setActiveSection')
);

assert(
  shell.includes(
    'visibleWorkspace.sections.find'
  )
);

console.log(
  'PASS  Dynamic section selection'
);

assert(
  shell.includes('WorkspaceLayout')
);

assert(
  shell.includes('WorkspaceNavigation')
);

console.log(
  'PASS  Existing workspace framework reused'
);

const adapter = read(
  'workspaces/employees/employeeWorkspaceAdapter.js'
);

assert(
  adapter.includes('readinessBySection')
);

assert(
  adapter.includes('fieldCount')
);

assert(
  adapter.includes('status')
);

console.log(
  'PASS  Navigation readiness metadata'
);

const employeeWorkspace = read(
  'workspaces/employees/EmployeeWorkspace.jsx'
);

assert(
  employeeWorkspace.includes(
    'EnterpriseEmployeeWorkspace'
  )
);

console.log(
  'PASS  Employee workspace switched to shell'
);

const main = read('main.jsx');

assert(
  main.includes(
    'metadata/metadata-workspace.css'
  )
);

console.log(
  'PASS  Workspace presentation registered'
);

console.log();
console.log(
  '✅ RC1-B Metadata-Driven Workspace Shell passed'
);
