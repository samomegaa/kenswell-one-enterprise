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

console.log('Enterprise Payroll Processing Workspace');
console.log();

[
  'src/workspaces/payroll/processing/PayrollProcessingWorkspace.jsx',
  'src/workspaces/payroll/processing/usePayrollProcessing.js',
  'src/workspaces/payroll/processing/payrollProcessingApi.js',
  'src/workspaces/payroll/processing/payrollProcessingModel.js',
  'src/workspaces/payroll/processing/payrollProcessingValidation.js',
  'src/workspaces/payroll/processing/PayPeriodStep.jsx',
  'src/workspaces/payroll/processing/EmployeeSelectionStep.jsx',
  'src/workspaces/payroll/processing/PayrollValidationStep.jsx',
  'src/workspaces/payroll/processing/PayrollPreviewStep.jsx',
  'src/workspaces/payroll/processing/PayrollApprovalStep.jsx',
  'src/workspaces/payroll/payroll-processing.css',
].forEach((relative) => {
  check(`Required file ${relative}`, fs.existsSync(path.join(frontend, relative)));
});

const api = source(
  'src/workspaces/payroll/processing/payrollProcessingApi.js'
);

check('Payroll run creation API', api.includes("request('/api/payroll-runs'"));
check('Payroll validation API', api.includes('/validate'));
check('Payroll preview API', api.includes('/preview'));
check('Payroll approval API', api.includes('/approve'));
check('Payroll processing API', api.includes('/process'));

check(
  'Payroll Employees panel exposes processing',
  source('src/workspaces/client/tabs/PayrollEmployeesPanel.jsx')
    .includes('<PayrollProcessingWorkspace')
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
  console.error(`FAILED: ${failed.length} payroll workspace check(s).`);
  process.exit(1);
}

console.log('✅ Enterprise Payroll Processing Workspace passed');
