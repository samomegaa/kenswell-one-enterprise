#!/usr/bin/env node

require('dotenv').config({
  path: '.env.local',
  quiet: true,
});

const fs = require('fs');
const http = require('http');
const assert = require('assert');

const {
  STORE_PATH,
} = require(
  '../../../../products/tax-payroll/src/' +
  'product-proof/application/' +
  'employee-sync-service'
);

process.env.TAX_PAYROLL_API_PORT = '0';

const {
  server,
} = require(
  '../../../../products/tax-payroll/src/' +
  'product-proof/api/server'
);

function requestJson({ port, method, path }) {
  return new Promise((resolve, reject) => {
    const request = http.request(
      {
        host: '127.0.0.1',
        port,
        method,
        path,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
      (response) => {
        let body = '';
        response.on('data', (chunk) => {
          body += chunk;
        });
        response.on('end', () => {
          try {
            resolve({
              statusCode: response.statusCode,
              body: JSON.parse(body),
            });
          } catch (error) {
            reject(error);
          }
        });
      }
    );

    request.on('error', reject);
    if (method === 'POST') {
      request.write('{}');
    }
    request.end();
  });
}

async function run() {
  const original = fs.readFileSync(STORE_PATH, 'utf8');
  const store = JSON.parse(original);

  const employer = (store.employers || []).find(
    (item) =>
      item.provider?.linked === true &&
      item.provider?.externalEmployerId
  );

  assert(employer, 'No linked employer is available');
  assert(server, 'API server export is unavailable');

  await new Promise((resolve) => {
    server.listen(0, '127.0.0.1', resolve);
  });

  const port = server.address().port;

  try {
    const before = await requestJson({
      port,
      method: 'GET',
      path:
        '/api/product-proof/clients/' +
        encodeURIComponent(employer.clientId) +
        '/employees',
    });

    assert.strictEqual(before.statusCode, 200);
    assert.strictEqual(before.body.ok, true);

    const synchronised = await requestJson({
      port,
      method: 'POST',
      path:
        '/api/product-proof/clients/' +
        encodeURIComponent(employer.clientId) +
        '/employees/synchronise',
    });

    assert.strictEqual(synchronised.statusCode, 200);
    assert.strictEqual(synchronised.body.ok, true);
    assert(synchronised.body.result.received > 0);

    const after = await requestJson({
      port,
      method: 'GET',
      path:
        '/api/product-proof/clients/' +
        encodeURIComponent(employer.clientId) +
        '/employees',
    });

    assert.strictEqual(
      after.body.result.count,
      synchronised.body.result.employeeCount
    );

    console.log('Employee API Boundary');
    console.log('---------------------');
    console.log(`Client: ${employer.clientId}`);
    console.log(`Employees: ${after.body.result.count}`);
    console.log('');
    console.log('✅ Employee API boundary passed');
  } finally {
    await new Promise((resolve) => {
      server.close(resolve);
    });
    fs.writeFileSync(STORE_PATH, original, 'utf8');
  }
}

run().catch((error) => {
  console.error('');
  console.error('❌ Employee API boundary failed');
  console.error(error);
  process.exit(1);
});
