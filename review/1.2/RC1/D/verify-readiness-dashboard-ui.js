#!/usr/bin/env node
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log(
  'RC1-D Readiness Dashboard UI'
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
  'workspaces/employees/readiness/ReadinessDashboard.jsx',
  'workspaces/employees/readiness/ReadinessCard.jsx',
  'workspaces/employees/readiness/ReadinessProgress.jsx',
  'workspaces/employees/readiness/MissingFieldList.jsx',
  'workspaces/employees/readiness/SectionStatusList.jsx',
  'workspaces/employees/readiness/DashboardSummary.jsx',
].forEach((relative) => {
  assert(
    fs.existsSync(path.join(root, relative)),
    `${relative} is missing`
  );
});

console.log(
  'PASS  Readiness dashboard components'
);

const dashboard = read(
  'workspaces/employees/readiness/ReadinessDashboard.jsx'
);

assert(
  dashboard.includes(
    'workspace.readiness?.levels'
  )
);

assert(
  dashboard.includes(
    'MissingFieldList'
  )
);

assert(
  dashboard.includes(
    'SectionStatusList'
  )
);

console.log(
  'PASS  Enterprise readiness consumed'
);

const progress = read(
  'workspaces/employees/readiness/ReadinessProgress.jsx'
);

assert(
  progress.includes('role="progressbar"')
);

assert(
  progress.includes('aria-valuenow')
);

console.log(
  'PASS  Accessible progress indicators'
);

const missing = read(
  'workspaces/employees/readiness/MissingFieldList.jsx'
);

assert(
  missing.includes('onSelectSection')
);

console.log(
  'PASS  Missing-field navigation'
);

const shell = read(
  'workspaces/employees/EnterpriseEmployeeWorkspace.jsx'
);

assert(
  shell.includes('<ReadinessDashboard')
);

assert(
  shell.includes(
    'onSelectSection={setActiveSection}'
  )
);

console.log(
  'PASS  Dashboard integrated with shell'
);

const main = read('main.jsx');

assert(
  main.includes(
    'readiness/readiness-dashboard.css'
  )
);

console.log(
  'PASS  Dashboard presentation registered'
);

console.log();
console.log(
  '✅ RC1-D Readiness Dashboard UI passed'
);
