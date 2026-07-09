const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');

const required = [
  'packages/core/src/tenant/TenantRegistry.js',
  'packages/core/src/tenant/createTenantRegistry.js',
  'packages/core/src/tenant/index.js',

  'packages/core/src/organisation/OrganisationRegistry.js',
  'packages/core/src/organisation/createOrganisationRegistry.js',
  'packages/core/src/organisation/index.js',

  'packages/core/src/identity/IdentityService.js',
  'packages/core/src/identity/createIdentityService.js',
  'packages/core/src/identity/identity.constants.js',
  'packages/core/src/identity/index.js',

  'review/1.0/B1/IDENTITY-TENANT-FOUNDATION.md',
];

for (const file of required) {
  const full = path.join(root, file);

  if (!fs.existsSync(full)) {
    throw new Error(`Missing identity foundation file: ${file}`);
  }

  if (!fs.readFileSync(full, 'utf8').trim()) {
    throw new Error(`Identity foundation file is empty: ${file}`);
  }
}

const {
  runtime: {
    createEnterpriseRuntime,
  },
  identity: {
    ENTERPRISE_ROLES,
  },
} = require(path.join(root, 'packages/core/src'));

const enterprise = createEnterpriseRuntime();

const summary = enterprise.summary();

if (summary.tenants !== 1) {
  throw new Error('Expected one default tenant');
}

if (summary.organisations !== 1) {
  throw new Error('Expected one default organisation');
}

if (summary.users !== 1) {
  throw new Error('Expected one default platform owner');
}

const tenant = enterprise.getTenant('tenant_kenswell');

if (!tenant || tenant.status !== 'active') {
  throw new Error('Default tenant missing or inactive');
}

const organisation = enterprise.getOrganisation('org_kenswell_main');

if (!organisation || organisation.tenantId !== 'tenant_kenswell') {
  throw new Error('Default organisation missing or linked to wrong tenant');
}

const owner = enterprise.getUser('user_platform_owner');

if (!owner || !enterprise.identityService.hasRole(owner.id, ENTERPRISE_ROLES.OWNER)) {
  throw new Error('Default platform owner missing owner role');
}

console.log('Enterprise identity and tenant foundation verified');
console.log(summary);
