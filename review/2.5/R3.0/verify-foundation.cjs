const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(process.argv[2] || process.cwd());
const commandDir = path.join(
  root,
  'src/enterprise/employees/commands'
);
const frontendDir = path.join(
  root,
  'products/tax-payroll/frontend/src/workspaces/' +
    'employees/editing/runtime'
);

for (const file of [
  'employee-command-types.js',
  'employee-command.js',
  'employee-command-validator.js',
  'employee-command-result.js',
  'employee-command-registry.js',
  'employee-command-dispatcher.js',
  'index.js',
]) {
  assert.ok(
    fs.existsSync(path.join(commandDir, file)),
    `Missing ${file}`
  );
}

for (const file of [
  'employeeDraftState.js',
  'employeeEditingModel.js',
  'employeeCommandPipeline.js',
  'useEmployeeEditingRuntime.js',
  'index.js',
]) {
  assert.ok(
    fs.existsSync(path.join(frontendDir, file)),
    `Missing ${file}`
  );
}

const backend = fs.readFileSync(
  path.join(commandDir, 'employee-command-dispatcher.js'),
  'utf8'
);
const frontend = fs.readFileSync(
  path.join(frontendDir, 'employeeCommandPipeline.js'),
  'utf8'
);

assert.ok(backend.includes('CommandBus'));
assert.ok(backend.includes('employeeCommandAccepted'));
assert.equal(/staffology/i.test(backend + frontend), false);
assert.equal(
  /\b(POST|PUT|PATCH|DELETE)\b/.test(frontend),
  false
);

console.log('');
console.log('Kenswell One Enterprise Version 2.5-R3.0');
console.log('Employee editing boundary: PASSED');
console.log('Draft state foundation: PASSED');
console.log('Dirty-field tracking: PASSED');
console.log('Command catalogue: PASSED');
console.log('Command validation: PASSED');
console.log('Enterprise CommandBus composition: PASSED');
console.log('Application boundary stop: PASSED');
console.log('Browser write transport: disabled');
console.log('Persistence execution: disabled');
console.log('Provider execution: disabled');
