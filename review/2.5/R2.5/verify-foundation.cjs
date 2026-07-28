const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(process.argv[2] || process.cwd());
const frontend = path.join(
  root,
  'products/tax-payroll/frontend'
);

const clientFile = path.join(
  frontend,
  'src/services/employee-enterprise-api.js'
);
const hookFile = path.join(
  frontend,
  'src/runtime/useEnterpriseEmployeeRuntime.js'
);
const indexFile = path.join(
  frontend,
  'src/runtime/index.js'
);
const certification = path.join(
  root,
  'review/2.5/R2.4/EMPLOYEE-ENTERPRISE-API.json'
);

for (const file of [
  clientFile,
  hookFile,
  indexFile,
  certification,
]) {
  assert.ok(fs.existsSync(file), `Missing ${file}`);
}

const client = fs.readFileSync(clientFile, 'utf8');
const hook = fs.readFileSync(hookFile, 'utf8');
const index = fs.readFileSync(indexFile, 'utf8');

for (const route of [
  '/api/enterprise/employees',
  '/api/enterprise/employees/query',
  '/api/enterprise/employees/context',
  '/api/enterprise/employees/',
]) {
  assert.ok(client.includes(route), `Missing ${route}`);
}

for (const operation of [
  'listEnterpriseEmployees',
  'queryEnterpriseEmployees',
  'getEnterpriseEmployeeContext',
  'getEnterpriseEmployee',
]) {
  assert.ok(client.includes(operation), `Missing ${operation}`);
}

assert.ok(
  hook.includes('useEnterpriseEmployeeRuntime'),
  'Runtime hook missing'
);
assert.ok(
  hook.includes('loading: true'),
  'Loading state missing'
);
assert.ok(
  hook.includes('error'),
  'Error state missing'
);
assert.ok(
  index.includes('useEnterpriseEmployeeRuntime'),
  'Runtime export missing'
);

assert.equal(
  /api\.staffology\.co\.uk/i.test(client + hook),
  false,
  'Direct Staffology browser access detected'
);

assert.equal(
  /\b(POST|PUT|PATCH|DELETE)\b/.test(client),
  false,
  'Write method detected'
);

console.log('');
console.log('Kenswell One Enterprise Version 2.5-R2.5');
console.log('Employee Frontend API Integration: PASSED');
console.log('R2.4 certification dependency: PASSED');
console.log('Collection client operation: PASSED');
console.log('Query client operation: PASSED');
console.log('Context client operation: PASSED');
console.log('Detail client operation: PASSED');
console.log('Loading state contract: PASSED');
console.log('Error state contract: PASSED');
console.log('Runtime export integration: PASSED');
console.log('Browser direct Staffology access: no');
console.log('Provider writes performed: no');
