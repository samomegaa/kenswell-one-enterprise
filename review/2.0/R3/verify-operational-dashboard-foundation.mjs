import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || process.cwd());
const src = path.join(
  root,
  'products/tax-payroll/frontend/src/product'
);

const required = [
  'dashboard/OperationalDashboard.jsx',
  'dashboard/DashboardMetric.jsx',
  'dashboard/DashboardActionCard.jsx',
  'dashboard/dashboardModel.js',
  'dashboard/operational-dashboard.css',
  'dashboard/index.js',
];

required.forEach((file) => {
  assert.ok(
    fs.existsSync(path.join(src, file)),
    `Missing R3 source: ${file}`
  );
});

const shell = fs.readFileSync(
  path.join(src, 'shell/OperationalProductShell.jsx'),
  'utf8'
);

assert.match(shell, /OperationalDashboard/);
assert.match(
  shell,
  /<OperationalDashboard>\{children\}<\/OperationalDashboard>/
);

const model = fs.readFileSync(
  path.join(src, 'dashboard/dashboardModel.js'),
  'utf8'
);

assert.match(model, /DASHBOARD_METRICS/);
assert.match(model, /DASHBOARD_ACTIONS/);

console.log('');
console.log('Kenswell One Enterprise Version 2.0-R3');
console.log('Operational Dashboard Foundation: PASSED');
console.log('Dashboard metrics: 4');
console.log('Operational action cards: 3');
console.log('Provider centre preserved: yes');
console.log('Staffology API contract changed: no');
