#!/usr/bin/env node

require('dotenv').config({
  path: '.env.local',
  quiet: true,
});

const fs = require('fs');
const assert = require('assert');

const {
  EmployeeSyncService,
  STORE_PATH,
} = require(
  '../../../../products/tax-payroll/src/' +
  'product-proof/application/' +
  'employee-sync-service'
);

async function run() {
  const original =
    fs.readFileSync(STORE_PATH, 'utf8');

  try {
    const store = JSON.parse(original);

    const employer =
      (store.employers || []).find(
        (item) =>
          item.provider?.linked === true &&
          item.provider?.externalEmployerId
      );

    assert(
      employer,
      'No linked employer is available'
    );

    const service =
      new EmployeeSyncService();

    const result =
      await service.synchronise(
        employer.clientId
      );

    assert(
      result.received > 0,
      'No provider employees were returned'
    );

    const updated = JSON.parse(
      fs.readFileSync(
        STORE_PATH,
        'utf8'
      )
    );

    const employees =
      updated.employees.filter(
        (item) =>
          item.employerId ===
          employer.id
      );

    assert.strictEqual(
      employees.length,
      result.employeeCount
    );

    console.log(
      'Employee Synchronisation'
    );
    console.log(
      '------------------------'
    );
    console.log(
      `Received: ${result.received}`
    );
    console.log(
      `Created: ${result.created}`
    );
    console.log(
      `Updated: ${result.updated}`
    );

    employees.forEach((employee) => {
      console.log(
        `- ${employee.displayName}`
      );
    });

    console.log('');
    console.log(
      '✅ Employee synchronisation passed'
    );
  } finally {
    fs.writeFileSync(
      STORE_PATH,
      original,
      'utf8'
    );
  }
}

run().catch((error) => {
  console.error('');
  console.error(
    '❌ Employee synchronisation failed'
  );
  console.error(error);
  process.exit(1);
});
