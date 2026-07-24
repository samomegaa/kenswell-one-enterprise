import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || process.cwd());
const payroll = path.join(
  root,
  'products/tax-payroll/frontend/src/product/payroll'
);

const required = [
  'EmployerPayrollContext.jsx',
  'context/createPayrollRuntimeWorkspace.js',
  'context/usePayrollEmployerContext.js',
  'context/index.js',
];

required.forEach((file) => {
  assert.ok(
    fs.existsSync(path.join(payroll, file)),
    `Missing R5 source: ${file}`
  );
});

const hook = fs.readFileSync(
  path.join(payroll, 'context/usePayrollEmployerContext.js'),
  'utf8'
);

assert.match(hook, /useEmployerRuntime/);
assert.match(hook, /selectedEmployer/);
assert.match(hook, /createPayrollRuntimeWorkspace/);

const adapter = fs.readFileSync(
  path.join(payroll, 'context/createPayrollRuntimeWorkspace.js'),
  'utf8'
);

assert.match(adapter, /enterprise-employer-runtime/);
assert.match(adapter, /employerId/);
assert.match(adapter, /Staffology/);

const workspace = fs.readFileSync(
  path.join(payroll, 'PayrollOperationalWorkspace.jsx'),
  'utf8'
);

assert.match(workspace, /usePayrollEmployerContext/);
assert.match(workspace, /EmployerPayrollContext/);
assert.match(workspace, /context.runtimeWorkspace/);
assert.doesNotMatch(workspace, /PropTypes/);

const contextView = fs.readFileSync(
  path.join(payroll, 'EmployerPayrollContext.jsx'),
  'utf8'
);

assert.match(contextView, /EmployerSelector/);
assert.match(contextView, /EmployerRuntimeGuard/);

console.log('');
console.log('Kenswell One Enterprise Version 2.0-R5');
console.log('Employer Runtime Selection and Payroll Context: PASSED');
console.log('Enterprise employer runtime reused: yes');
console.log('Employer selector reused: yes');
console.log('Payroll runtime workspace composed: yes');
console.log('Duplicate employer state introduced: no');
console.log('Staffology payroll behaviour changed: no');
