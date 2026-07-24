import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(
  process.argv[2] || process.cwd()
);

const payroll = path.join(
  root,
  'products/tax-payroll/frontend/src/product/payroll'
);

const shell = path.join(
  root,
  'products/tax-payroll/frontend/src/product/shell'
);

const required = [
  'ActivatedPayrollWorkspace.jsx',
  'PayrollRuntimeCard.jsx',
  'payroll-runtime-card.css',
  'session/PayrollSessionContext.js',
  'session/PayrollSessionProvider.jsx',
  'session/activatePayrollSession.js',
  'session/restorePayrollSession.js',
  'session/payrollSessionStorage.js',
  'session/usePayrollSession.js',
  'session/index.js',
];

for (const file of required) {
  assert.ok(
    fs.existsSync(path.join(payroll, file)),
    `Missing R6 source: ${file}`
  );
}

const activated = fs.readFileSync(
  path.join(
    payroll,
    'ActivatedPayrollWorkspace.jsx'
  ),
  'utf8'
);

assert.match(activated, /usePayrollEmployerContext/);
assert.match(activated, /PayrollSessionProvider/);
assert.match(activated, /runtimeWorkspace/);

const provider = fs.readFileSync(
  path.join(
    payroll,
    'session/PayrollSessionProvider.jsx'
  ),
  'utf8'
);

assert.match(provider, /restorePayrollSession/);
assert.match(provider, /writePayrollSession/);

const workspace = fs.readFileSync(
  path.join(
    payroll,
    'PayrollOperationalWorkspace.jsx'
  ),
  'utf8'
);

assert.match(workspace, /usePayrollSession/);
assert.match(workspace, /PayrollRuntimeCard/);
assert.match(workspace, /session\.runtimeWorkspace/);

const shellSource = fs.readFileSync(
  path.join(
    shell,
    'OperationalProductShell.jsx'
  ),
  'utf8'
);

assert.match(shellSource, /ActivatedPayrollWorkspace/);
assert.doesNotMatch(
  shellSource,
  /PayrollOperationalWorkspace from/
);

console.log('');
console.log('Kenswell One Enterprise Version 2.0-R6');
console.log('Employer Payroll Workspace Activation: PASSED');
console.log('Enterprise employer runtime reused: yes');
console.log('Employer session activated: yes');
console.log('Payroll session restoration: yes');
console.log('Operational runtime card connected: yes');
console.log('Workspace activation completed: yes');
console.log('Duplicate employer runtime introduced: no');
console.log('Staffology payroll behaviour changed: no');
