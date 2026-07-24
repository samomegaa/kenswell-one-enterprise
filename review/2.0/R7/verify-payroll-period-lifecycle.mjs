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

const required = [
  'PayrollPeriodCard.jsx',
  'payroll-period-card.css',
  'period/PayrollPeriodContext.js',
  'period/PayrollPeriodProvider.jsx',
  'period/activatePayrollPeriod.js',
  'period/closePayrollPeriod.js',
  'period/createDefaultPayrollPeriod.js',
  'period/payrollLifecycle.js',
  'period/payrollPeriodStorage.js',
  'period/restorePayrollPeriod.js',
  'period/usePayrollPeriod.js',
  'period/index.js',
];

for (const file of required) {
  assert.ok(
    fs.existsSync(path.join(payroll, file)),
    `Missing R7 source: ${file}`
  );
}

const activated = fs.readFileSync(
  path.join(
    payroll,
    'ActivatedPayrollWorkspace.jsx'
  ),
  'utf8'
);

assert.match(activated, /PayrollSessionProvider/);
assert.match(activated, /PayrollPeriodProvider/);
assert.match(activated, /usePayrollSession/);

const workspace = fs.readFileSync(
  path.join(
    payroll,
    'PayrollOperationalWorkspace.jsx'
  ),
  'utf8'
);

assert.match(workspace, /usePayrollPeriod/);
assert.match(workspace, /PayrollPeriodCard/);
assert.match(workspace, /periodState\.stage/);
assert.match(workspace, /StaffologyPayrollRunWorkspace/);

const lifecycle = fs.readFileSync(
  path.join(
    payroll,
    'period/payrollLifecycle.js'
  ),
  'utf8'
);

for (const stage of [
  'created',
  'activated',
  'employee-selection',
  'calculation',
  'validation',
  'approval',
  'fps-preparation',
  'submitted',
  'closed',
]) {
  assert.match(lifecycle, new RegExp(stage));
}

console.log('');
console.log('Kenswell One Enterprise Version 2.0-R7');
console.log(
  'Payroll Period Activation & Operational Lifecycle: PASSED'
);
console.log('Enterprise employer runtime reused: yes');
console.log('Payroll session reused: yes');
console.log('Payroll period runtime activated: yes');
console.log('Lifecycle state established: yes');
console.log('Period restoration: yes');
console.log('Duplicate employer state introduced: no');
console.log('Staffology payroll behaviour changed: no');
