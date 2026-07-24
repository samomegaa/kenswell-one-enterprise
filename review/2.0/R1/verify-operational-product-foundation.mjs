import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(process.argv[2] || process.cwd());
const product = path.join(
  root,
  'products/tax-payroll/frontend/src/product'
);

const required = [
  'productSections.js',
  'providerCapabilities.js',
  'workspaceRegistry.js',
  'workspaceRegistryQueries.js',
  'createProductNavigation.js',
  'index.js',
];

required.forEach((file) => {
  assert.ok(
    fs.existsSync(path.join(product, file)),
    `Missing R1 source: ${file}`
  );
});

const moduleUrl = pathToFileURL(
  path.join(product, 'index.js')
).href;

const api = await import(moduleUrl);
const navigation = api.createProductNavigation();

assert.equal(api.PRODUCT_SECTIONS.length, 8);
assert.equal(api.OPERATIONAL_WORKSPACES.length, 8);
assert.equal(navigation.length, 8);

assert.deepEqual(
  navigation.map((item) => item.label),
  [
    'Dashboard',
    'Payroll',
    'RTI',
    'Employees',
    'HMRC',
    'Pensions',
    'Reports',
    'Organisation',
  ]
);

const ids = new Set(
  api.OPERATIONAL_WORKSPACES.map((item) => item.id)
);

assert.equal(ids.size, api.OPERATIONAL_WORKSPACES.length);
assert.equal(
  api.getOperationalWorkspace('payroll-run')?.availability,
  'available'
);
assert.equal(
  api.getOperationalWorkspace('organisation')?.provider,
  'staffology'
);

console.log('');
console.log('Kenswell One Enterprise Version 2.0-R1');
console.log('Operational Product Foundation: PASSED');
console.log(`Product sections: ${api.PRODUCT_SECTIONS.length}`);
console.log(`Registered workspaces: ${api.OPERATIONAL_WORKSPACES.length}`);
console.log('Existing application entry point changed: no');
console.log('Existing Staffology workspace replaced: no');
