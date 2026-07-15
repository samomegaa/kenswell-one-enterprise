#!/usr/bin/env node

require('dotenv').config({
  path: '.env.local',
  quiet: true,
});

const assert = require('assert');

const {
  ProviderHealthService,
} = require(
  '../../../../products/tax-payroll/src/' +
  'product-proof/application/' +
  'provider-health-service'
);

async function run() {
  const service = new ProviderHealthService();
  const centre = await service.getProviderCentre();
  const staffology = centre.providers.find(
    (item) => item.name === 'staffology'
  );

  assert(staffology);
  assert.strictEqual(staffology.available, true);
  assert.strictEqual(staffology.status, 'connected');
  assert.strictEqual(centre.connectedProviders, 1);

  console.log('Provider Centre Live Health');
  console.log('---------------------------');
  console.log(`Staffology: ${staffology.status}`);
  console.log(`Checked: ${staffology.checkedAt}`);
  console.log('');
  console.log('✅ Live provider health passed');
}

run().catch((error) => {
  console.error('');
  console.error('❌ Live provider health failed');
  console.error(error);
  process.exit(1);
});
