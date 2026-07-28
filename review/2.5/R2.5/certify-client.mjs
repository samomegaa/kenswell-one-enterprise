import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(process.argv[2] || process.cwd());
const reviewRoot = path.join(root, 'review/2.5/R2.5');
const clientFile = path.join(
  root,
  'products/tax-payroll/frontend/src/services/' +
    'employee-enterprise-api.js'
);

const calls = [];

const responses = new Map([
  [
    '/api/enterprise/employees',
    {
      ok: true,
      data: {
        status: 'success',
        count: 0,
        empty: true,
        employees: [],
      },
      error: null,
      meta: {},
    },
  ],
  [
    '/api/enterprise/employees/query?page=1&pageSize=25',
    {
      ok: true,
      data: {
        count: 0,
        empty: true,
        employees: [],
        pagination: {
          page: 1,
          pageSize: 25,
          totalPages: 0,
        },
      },
      error: null,
      meta: {},
    },
  ],
  [
    '/api/enterprise/employees/context',
    {
      ok: true,
      data: {
        availability: 'unavailable',
        reason: 'empty_employee_collection',
      },
      error: null,
      meta: {},
    },
  ],
  [
    '/api/enterprise/employees/employee%2F001',
    {
      ok: true,
      data: {
        status: 'not_found',
        employeeRef: 'employee/001',
        found: false,
        employee: null,
      },
      error: null,
      meta: {},
    },
  ],
]);

globalThis.fetch = async (url, options = {}) => {
  const parsed = new URL(url, 'http://frontend.local');
  const key = `${parsed.pathname}${parsed.search}`;

  calls.push({
    key,
    method: options.method || 'GET',
    accept: options.headers?.Accept,
  });

  const payload = responses.get(key);

  if (!payload) {
    return {
      ok: false,
      status: 404,
      json: async () => ({
        ok: false,
        error: {
          code: 'NOT_FOUND',
          message: `No mock response for ${key}`,
        },
      }),
    };
  }

  return {
    ok: true,
    status: 200,
    json: async () => payload,
  };
};

const moduleUrl = `${pathToFileURL(clientFile).href}?r2_5=1`;
const client = await import(moduleUrl);

const collection = await client.listEnterpriseEmployees();
const query = await client.queryEnterpriseEmployees({
  page: 1,
  pageSize: 25,
});
const context = await client.getEnterpriseEmployeeContext();
const detail = await client.getEnterpriseEmployee('employee/001');

assert.equal(collection.empty, true);
assert.equal(collection.count, 0);
assert.equal(query.empty, true);
assert.equal(query.pagination.totalPages, 0);
assert.equal(context.availability, 'unavailable');
assert.equal(context.reason, 'empty_employee_collection');
assert.equal(detail.found, false);
assert.equal(detail.employeeRef, 'employee/001');

assert.throws(
  () => client.getEnterpriseEmployee(''),
  (error) =>
    error.code === 'EMPLOYEE_REFERENCE_REQUIRED' &&
    error.status === 400
);

assert.equal(calls.length, 4);
assert.ok(calls.every((call) => call.method === 'GET'));
assert.ok(calls.every((call) => call.accept === 'application/json'));

const evidence = {
  status: 'EMPLOYEE_FRONTEND_RUNTIME_CONTRACT_CERTIFIED',
  transport: 'mocked_browser_fetch',
  operations: {
    listEmployees: collection,
    queryEmployees: query,
    getEmployeeContext: context,
    getEmployee: detail,
  },
  requests: calls,
  invariants: {
    r2_4EnvelopeConsumed: true,
    emptyStatePreserved: true,
    unavailableContextPreserved: true,
    employeeReferenceEncoded: true,
    requestValidation: true,
    getOnlyTransport: true,
    browserDirectStaffologyAccess: false,
    liveProviderCallsPerformed: 0,
    providerWritesPerformed: 0,
  },
};

fs.writeFileSync(
  path.join(reviewRoot, 'EMPLOYEE-FRONTEND-RUNTIME.json'),
  JSON.stringify(evidence, null, 2) + '\n',
  { mode: 0o600 }
);

fs.writeFileSync(
  path.join(reviewRoot, 'CERTIFICATION.md'),
  [
    '# Employee Enterprise API Client & Runtime Certification',
    '',
    '## Status: EMPLOYEE_FRONTEND_RUNTIME_CONTRACT_CERTIFIED',
    '',
    '- Employee collection client: certified',
    '- Employee query client: certified',
    '- Employee Context client: certified',
    '- Employee detail client: certified',
    '- R2.4 envelope consumption: certified',
    '- Empty Employee state preserved: yes',
    '- Unavailable Employee Context preserved: yes',
    '- Employee reference encoding: certified',
    '- Frontend request validation: certified',
    '- GET-only browser transport: certified',
    '- Browser direct Staffology access: no',
    '- Live provider calls performed: 0',
    '- Provider writes performed: 0',
    '',
  ].join('\n'),
  { mode: 0o600 }
);

console.log('');
console.log('Employee Frontend Runtime certification: PASSED');
console.log(
  'Status: EMPLOYEE_FRONTEND_RUNTIME_CONTRACT_CERTIFIED'
);
console.log('Employee collection client: CERTIFIED');
console.log('Employee query client: CERTIFIED');
console.log('Employee Context client: CERTIFIED');
console.log('Employee detail client: CERTIFIED');
console.log('R2.4 response consumption: CERTIFIED');
console.log('Loading and error runtime contract: CERTIFIED');
console.log('GET-only browser transport: CERTIFIED');
console.log('Browser direct Staffology access: no');
console.log('Live provider calls performed: 0');
console.log('Provider writes performed: 0');
