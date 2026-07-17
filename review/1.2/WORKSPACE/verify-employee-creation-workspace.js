#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '../../..');
const frontend = path.join(root, 'products/tax-payroll/frontend');
const checks = [];

function check(name, condition) {
  const passed = Boolean(condition);
  checks.push({ name, passed });
  console.log(`${passed ? 'PASS' : 'FAIL'}  ${name}`);
}

function source(relative) {
  const file = path.join(frontend, relative);
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

console.log('Enterprise Employee Creation Workspace');
console.log();

const required = [
  'src/workspaces/employees/creation/EmployeeCreationWorkspace.jsx',
  'src/workspaces/employees/creation/useEmployeeCreation.js',
  'src/workspaces/employees/creation/employeeCreationModel.js',
  'src/workspaces/employees/creation/employeeCreationValidation.js',
  'src/workspaces/employees/creation/IdentityStep.jsx',
  'src/workspaces/employees/creation/EmploymentStep.jsx',
  'src/workspaces/employees/creation/PayrollStep.jsx',
  'src/workspaces/employees/creation/TaxStep.jsx',
  'src/workspaces/employees/creation/PensionStep.jsx',
  'src/workspaces/employees/creation/ReviewStep.jsx',
];

required.forEach((relative) => {
  check(`Required file ${relative}`, fs.existsSync(path.join(frontend, relative)));
});

check(
  'Employee API exposes create',
  source('src/workspaces/employees/employeeApi.js')
    .includes("request('/api/employees'")
);

check(
  'Payroll workspace exposes creation',
  source('src/workspaces/client/tabs/PayrollEmployeesPanel.jsx')
    .includes('<EmployeeCreationWorkspace')
);

check(
  'Creation workspace exported',
  source('src/workspaces/employees/index.js')
    .includes('EmployeeCreationWorkspace')
);

console.log();
console.log('Running production frontend build...');

const build = spawnSync('npm', ['run', 'build'], {
  cwd: frontend,
  encoding: 'utf8',
  stdio: 'pipe',
});

if (build.stdout) process.stdout.write(build.stdout);
if (build.stderr) process.stderr.write(build.stderr);

check('Production build', build.status === 0);

const failed = checks.filter((item) => !item.passed);

console.log();
if (failed.length) {
  console.error(`FAILED: ${failed.length} creation workspace check(s).`);
  process.exit(1);
}

console.log('✅ Enterprise Employee Creation Workspace passed');
