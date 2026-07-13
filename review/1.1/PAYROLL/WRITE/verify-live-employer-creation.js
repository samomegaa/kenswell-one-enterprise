#!/usr/bin/env node

require('dotenv').config({
  path: '.env.local',
  quiet: true,
});

const assert = require('assert');

const {
  PayrollProviderMode,
  createEnterprisePayrollPlatform,
  staffology,
} = require(
  '../../../../src/enterprise/payroll'
);

function requireWriteApproval() {
  assert.strictEqual(
    process.env.ALLOW_STAFFOLOGY_WRITE,
    'true',
    'Set ALLOW_STAFFOLOGY_WRITE=true to run this controlled live write'
  );
}

async function run() {
  requireWriteApproval();

  const apiKey =
    String(
      process.env.STAFFOLOGY_API_KEY || ''
    ).trim();

  assert(
    apiKey,
    'STAFFOLOGY_API_KEY is required'
  );

  const provider =
    staffology.createStaffologyPayrollProvider({
      apiKey,

      baseUrl:
        process.env.STAFFOLOGY_BASE_URL ||
        'https://api.staffology.co.uk',

      username:
        process.env.STAFFOLOGY_API_USERNAME ||
        'api',

      mode: PayrollProviderMode.TEST,
    });

  const platform =
    createEnterprisePayrollPlatform({
      providers: [provider],
      defaultProvider: 'staffology',
    });

  const health =
    await platform.manager.checkHealth(
      'staffology'
    );

  assert.strictEqual(
    health.available,
    true,
    'Staffology provider is unavailable'
  );

  const suffix =
    new Date()
      .toISOString()
      .replace(/[-:.TZ]/g, '')
      .slice(0, 14);

  const employerName =
    `Kenswell W1 Verification ${suffix}`;

  const creation =
    await platform.manager.createEmployer(
      {
        name: employerName,
        legalName: employerName,

        payrollStartYear: '2026-27',

        addressLine1:
          '668 Old Kent Road',

        city: 'London',
        postcode: 'SE15 1JF',
        country: 'England',

        // Deliberately omitted for the controlled
        // product-proof employer:
        payeOfficeNumber: '',
        payeReference: '',
        accountsOfficeReference: '',
      },
      {
        provider: 'staffology',

        metadata: {
          verification:
            'live-employer-write-w1',
        },
      }
    );

  assert.strictEqual(
    creation.ok,
    true,
    'manager employer creation failed'
  );

  assert.strictEqual(
    creation.provider,
    'staffology',
    'wrong payroll provider selected'
  );

  const externalEmployerId =
    creation.result.externalEmployerId;

  assert(
    externalEmployerId,
    'Staffology employer ID was not returned'
  );

  const detail =
    await platform.manager.getEmployer(
      {
        employerRef:
          externalEmployerId,
      },
      {
        provider: 'staffology',

        metadata: {
          verification:
            'live-employer-write-readback',
        },
      }
    );

  assert.strictEqual(
    detail.ok,
    true,
    'created employer could not be read back'
  );

  assert.strictEqual(
    detail.result.employer
      .externalEmployerId,
    externalEmployerId,
    'read-back employer ID mismatch'
  );

  assert.strictEqual(
    detail.result.employer.name,
    employerName,
    'read-back employer name mismatch'
  );

  console.log(
    'Enterprise Payroll Live Employer Creation'
  );

  console.log(
    '-----------------------------------------'
  );

  console.log(
    'Manager operation: createEmployer'
  );

  console.log(
    `Provider: ${creation.provider}`
  );

  console.log(
    `Employer: ${employerName}`
  );

  console.log(
    `External ID: ${externalEmployerId}`
  );

  console.log(
    `Start tax year: ${
      creation.result.employer
        .startTaxYear || 'not returned'
    }`
  );

  console.log(
    'Read-back verification: PASS'
  );

  console.log('');

  console.log(
    '✅ Enterprise live employer creation passed'
  );

  console.log('');
  console.log(
    'This verification created a real Staffology employer.'
  );

  console.log(
    'It may be archived or removed manually after review.'
  );
}

run().catch((error) => {
  console.error('');

  console.error(
    '❌ Enterprise live employer creation failed'
  );

  console.error(error);
  process.exit(1);
});
