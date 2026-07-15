#!/usr/bin/env node

require('dotenv').config({
  path: '.env.local',
  quiet: true,
});

const assert = require('assert');

const {
  ProviderEmployerService,
} = require(
  '../../../../products/tax-payroll/src/' +
  'product-proof/application/' +
  'provider-employer-service'
);

async function run() {
  const service = new ProviderEmployerService();
  const result = await service.listStaffologyEmployers();

  assert.strictEqual(result.provider, 'staffology');
  assert(Array.isArray(result.employers));
  assert(result.count > 0, 'No Staffology employers were returned');
  assert.strictEqual(result.count, result.employers.length);

  console.log('Provider Centre Employer Discovery');
  console.log('----------------------------------');
  console.log(`Provider: ${result.provider}`);
  console.log(`Employers: ${result.count}`);
  result.employers.forEach((employer) => console.log(`- ${employer.name}`));
  console.log('');
  console.log('✅ Live employer discovery passed');
}

run().catch((error) => {
  console.error('');
  console.error('❌ Live employer discovery failed');
  console.error(error);
  process.exit(1);
});
