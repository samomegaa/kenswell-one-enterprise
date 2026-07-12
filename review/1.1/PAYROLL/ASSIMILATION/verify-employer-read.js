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

async function run() {
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

  assert(
    health.available === true,
    'Staffology provider health check failed'
  );

  const listing =
    await platform.manager.listEmployers(
      {},
      {
        provider: 'staffology',
        metadata: {
          verification:
            'employer-read-assimilation',
        },
      }
    );

  assert(
    listing.ok === true,
    'manager employer listing did not succeed'
  );

  assert.strictEqual(
    listing.provider,
    'staffology',
    'manager selected the wrong provider'
  );

  assert(
    listing.result.count > 0,
    'no Staffology employers were returned'
  );

  assert.strictEqual(
    listing.result.count,
    listing.result.employers.length,
    'employer count mismatch'
  );

  const first =
    listing.result.employers[0];

  assert(
    first.externalEmployerId,
    'external employer id is missing'
  );

  assert(
    first.name,
    'employer name is missing'
  );

  assert.strictEqual(
    first.provider,
    'staffology',
    'canonical provider name mismatch'
  );

  assert.strictEqual(
    Object.hasOwn(first, 'metadata'),
    false,
    'raw Staffology metadata escaped provider boundary'
  );

  const detail =
    await platform.manager.getEmployer(
      {
        employerRef:
          first.externalEmployerId,
      },
      {
        provider: 'staffology',
        metadata: {
          verification:
            'employer-detail-assimilation',
        },
      }
    );

  assert(
    detail.ok === true,
    'manager employer detail did not succeed'
  );

  assert.strictEqual(
    detail.result.employer
      .externalEmployerId,
    first.externalEmployerId,
    'employer detail id mismatch'
  );

  assert.strictEqual(
    detail.result.employer.provider,
    'staffology',
    'employer detail provider mismatch'
  );

  console.log(
    'Enterprise Payroll Employer Assimilation'
  );

  console.log(
    '----------------------------------------'
  );

  console.log(
    `Provider: ${listing.provider}`
  );

  console.log(
    `Employers: ${listing.result.count}`
  );

  for (
    const employer of
    listing.result.employers
  ) {
    console.log(
      `- ${employer.name}`
    );

    console.log(
      `  ID: ${employer.externalEmployerId}`
    );
  }

  console.log('');

  console.log(
    `Detail verified: ` +
    `${detail.result.employer.name}`
  );

  console.log('');

  console.log(
    '✅ Enterprise employer read assimilation passed'
  );
}

run().catch((error) => {
  console.error('');
  console.error(
    '❌ Enterprise employer read assimilation failed'
  );

  console.error(error);
  process.exit(1);
});
