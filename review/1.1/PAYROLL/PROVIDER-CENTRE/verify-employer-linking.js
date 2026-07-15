#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const STORE_PATH = path.resolve(
  __dirname,
  '../../../../products/tax-payroll/data/product-proof/store.json'
);

const {
  ProviderEmployerLinkService,
} = require(
  '../../../../products/tax-payroll/src/product-proof/' +
  'application/provider-employer-link-service'
);

function run() {
  const original = fs.readFileSync(STORE_PATH, 'utf8');

  try {
    const store = JSON.parse(original);
    const client = store.clients?.[0];
    assert(client, 'No client available');

    const service = new ProviderEmployerLinkService();
    const result = service.linkStaffologyEmployer({
      clientId: client.id,
      externalEmployerId: 'verification-employer-link',
      employerName: 'Verification Employer',
    });

    assert.strictEqual(result.linked, true);

    const updated = JSON.parse(
      fs.readFileSync(STORE_PATH, 'utf8')
    );

    const linked = updated.employers.find(
      (item) =>
        item.provider?.externalEmployerId ===
        'verification-employer-link'
    );

    assert(linked);
    assert.strictEqual(linked.provider.status, 'connected');

    console.log('✅ Employer linking verification passed');
  } finally {
    fs.writeFileSync(STORE_PATH, original, 'utf8');
  }
}

try {
  run();
} catch (error) {
  console.error('❌ Employer linking verification failed');
  console.error(error);
  process.exit(1);
}
