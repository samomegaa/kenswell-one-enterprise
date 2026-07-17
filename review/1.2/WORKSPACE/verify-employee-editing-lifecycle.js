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

console.log('Enterprise Employee Editing & Lifecycle Workspace');
console.log();

[
  'src/workspaces/employees/editing/EmployeeEditingWorkspace.jsx',
  'src/workspaces/employees/editing/useEmployeeEditing.js',
  'src/workspaces/employees/editing/employeeEditingModel.js',
  'src/workspaces/employees/editing/employeeEditingValidation.js',
  'src/workspaces/employees/editing/EmployeeLifecyclePanel.jsx',
  'src/workspaces/employees/editing/EmployeeEditReview.jsx',
  'src/workspaces/employees/employee-editing.css',
].forEach((relative) => {
  check(`Required file ${relative}`, fs.existsSync(path.join(frontend, relative)));
});

check(
  'Employee API exposes version-aware update',
  source('src/workspaces/employees/employeeApi.js').includes('updateEmployee')
);

check(
  'Employee workspace exposes editing',
  source('src/workspaces/employees/EmployeeWorkspace.jsx')
    .includes('<EmployeeEditingWorkspace')
);

check(
  'Lifecycle actions available',
  source('src/workspaces/employees/editing/employeeEditingModel.js')
    .includes('LIFECYCLE_ACTIONS')
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
  console.error(`FAILED: ${failed.length} editing workspace check(s).`);
  process.exit(1);
}

console.log('✅ Enterprise Employee Editing & Lifecycle Workspace passed');
