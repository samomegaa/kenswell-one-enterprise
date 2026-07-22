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
  'dashboard/index.js',
  'dashboard/dashboardContract.js',
  'dashboard/dashboardResolver.js',
  'dashboard/adaptStaffologyOrganisationDashboard.js',
  'dashboard/dashboardPresentation.js',
  'dashboard/dashboardPresentationModel.js',
  'dashboard/DashboardMetricCard.jsx',
  'dashboard/DashboardStatusPanel.jsx',
  'dashboard/UnavailableContractsPanel.jsx',
  'dashboard/StaffologyOrganisationDashboard.jsx',
  'dashboard/dashboard.css',
].forEach((file) => {
  assert.ok(
    fs.existsSync(path.join(base, file)),
    `Missing A5 file: ${file}`
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
  'StaffologyOrganisationDashboard',
  "id: 'dashboard'",
  "label: 'Dashboard'",
  "useState('dashboard')",
].forEach((token) => {
  assert.ok(
    workspace.includes(token),
    `Missing dashboard token: ${token}`
  );
});

console.log(
  'Staffology Organisation Dashboard verification passed'
);
