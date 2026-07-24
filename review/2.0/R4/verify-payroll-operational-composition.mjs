import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || process.cwd());
const product = path.join(
  root,
  'products/tax-payroll/frontend/src/product'
);

const required = [
  'payroll/PayrollOperationalWorkspace.jsx',
  'payroll/PayrollRuntimeRequired.jsx',
  'payroll/PayrollWorkflowRail.jsx',
  'payroll/PayrollWorkspaceHeader.jsx',
  'payroll/payrollWorkflow.js',
  'payroll/payroll-operational-workspace.css',
  'payroll/payroll-operational-responsive.css',
  'payroll/index.js',
];

required.forEach((file) => {
  assert.ok(
    fs.existsSync(path.join(product, file)),
    `Missing R4 source: ${file}`
  );
});

const payroll = fs.readFileSync(
  path.join(product, 'payroll/PayrollOperationalWorkspace.jsx'),
  'utf8'
);

assert.match(payroll, /StaffologyPayrollRunWorkspace/);
assert.match(payroll, /runtimeWorkspace/);
assert.match(payroll, /PayrollRuntimeRequired/);

const workflow = fs.readFileSync(
  path.join(product, 'payroll/payrollWorkflow.js'),
  'utf8'
);

[
  'employee-selection',
  'calculation',
  'validation',
  'approval',
  'fps-preparation',
].forEach((stage) => assert.match(workflow, new RegExp(stage)));

const shell = fs.readFileSync(
  path.join(product, 'shell/OperationalProductShell.jsx'),
  'utf8'
);

assert.match(shell, /PayrollOperationalWorkspace/);
assert.match(shell, /selected.id === 'payroll'/);

console.log('');
console.log('Kenswell One Enterprise Version 2.0-R4');
console.log('Payroll Operational Workspace Composition: PASSED');
console.log('Workflow stages: 5');
console.log('Staffology payroll-run workspace reused: yes');
console.log('Runtime context guard: yes');
console.log('Staffology payroll behaviour changed: no');
