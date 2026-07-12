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

  assert.strictEqual(
    health.available,
    true,
    'Staffology provider is not available'
  );

  const employerListing =
    await platform.manager.listEmployers(
      {},
      {
        provider: 'staffology',
        metadata: {
          verification:
            'schedule-employer-selection',
        },
      }
    );

  const employer =
    employerListing.result.employers.find(
      (item) =>
        item.currentTaxYear &&
        item.externalEmployerId
    );

  assert(
    employer,
    'no employer with a current tax year was found'
  );

  const scheduleListing =
    await platform.manager.listPaySchedules(
      {
        employerRef:
          employer.externalEmployerId,

        taxYear:
          employer.currentTaxYear,
      },
      {
        provider: 'staffology',
        metadata: {
          verification:
            'pay-schedule-read-assimilation',
        },
      }
    );

  assert.strictEqual(
    scheduleListing.ok,
    true,
    'manager schedule listing failed'
  );

  assert.strictEqual(
    scheduleListing.provider,
    'staffology',
    'manager selected the wrong provider'
  );

  assert(
    scheduleListing.result.count > 0,
    'no pay schedules were returned'
  );

  assert.strictEqual(
    scheduleListing.result.count,
    scheduleListing.result.schedules.length,
    'pay-schedule count mismatch'
  );

  const first =
    scheduleListing.result.schedules[0];

  assert.strictEqual(
    first.provider,
    'staffology',
    'schedule provider mapping mismatch'
  );

  assert.strictEqual(
    first.employerRef,
    employer.externalEmployerId,
    'schedule employer reference mismatch'
  );

  assert.strictEqual(
    first.taxYear,
    employer.currentTaxYear,
    'schedule tax-year mismatch'
  );

  assert(
    first.payPeriod,
    'schedule pay period is missing'
  );

  assert.strictEqual(
    Object.hasOwn(first, 'metadata'),
    false,
    'raw Staffology metadata escaped provider boundary'
  );

  const configured =
    scheduleListing.result.schedules.filter(
      (schedule) => schedule.configured
    );

  assert(
    configured.length > 0,
    'no configured pay schedule was returned'
  );

  console.log(
    'Enterprise Payroll Pay Schedule Assimilation'
  );

  console.log(
    '--------------------------------------------'
  );

  console.log(
    `Provider: ${scheduleListing.provider}`
  );

  console.log(
    `Employer: ${employer.name}`
  );

  console.log(
    `Tax year: ${scheduleListing.result.taxYear}`
  );

  console.log(
    `Schedules: ${scheduleListing.result.count}`
  );

  for (
    const schedule of
    scheduleListing.result.schedules
  ) {
    console.log(
      `- ${schedule.payPeriod}`
    );

    console.log(
      `  Configured: ${
        schedule.configured ? 'YES' : 'NO'
      }`
    );

    console.log(
      `  Required: ${
        schedule.required ? 'YES' : 'NO'
      }`
    );

    console.log(
      `  Open pay run: ${
        schedule.hasOpenPayRunPeriod
          ? 'YES'
          : 'NO'
      }`
    );
  }

  console.log('');

  console.log(
    `Configured schedules verified: ` +
    `${configured.length}`
  );

  console.log('');

  console.log(
    '✅ Enterprise pay-schedule read assimilation passed'
  );
}

run().catch((error) => {
  console.error('');

  console.error(
    '❌ Enterprise pay-schedule read assimilation failed'
  );

  console.error(error);
  process.exit(1);
});
