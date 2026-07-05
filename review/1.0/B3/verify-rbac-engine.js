const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');

const required = [
  'packages/core/src/rbac/PermissionEngine.js',
  'packages/core/src/rbac/RBACService.js',
  'packages/core/src/rbac/createRBACService.js',
  'packages/core/src/rbac/index.js',
  'packages/core/src/rbac/permissions.json',
  'packages/core/src/rbac/roles.json',
  'review/1.0/B3/RBAC-ENGINE.md',
];

for (const file of required) {
  const full = path.join(root, file);

  if (!fs.existsSync(full)) {
    throw new Error(`Missing RBAC file: ${file}`);
  }

  if (!fs.readFileSync(full, 'utf8').trim()) {
    throw new Error(`RBAC file is empty: ${file}`);
  }
}

const {
  runtime: {
    createEnterpriseRuntime,
  },
  rbac: {
    createRBACService,
    RBACService,
    PermissionEngine,
  },
  identity: {
    ENTERPRISE_ROLES,
  },
} = require(path.join(root, 'packages/core/src'));

const service = createRBACService();

if (!(service instanceof RBACService)) {
  throw new Error('RBACService not created');
}

if (!(service.permissionEngine instanceof PermissionEngine)) {
  throw new Error('PermissionEngine not created');
}

if (service.roles().length !== 5) {
  throw new Error('Expected 5 enterprise roles');
}

if (!service.exists('documents.approve')) {
  throw new Error('documents.approve permission missing');
}

const owner = {
  id: 'owner',
  roles: [ENTERPRISE_ROLES.OWNER],
};

const admin = {
  id: 'admin',
  roles: [ENTERPRISE_ROLES.ADMIN],
};

const client = {
  id: 'client',
  roles: [ENTERPRISE_ROLES.CLIENT],
};

if (!service.can(owner, 'tenant.manage')) {
  throw new Error('Owner should manage tenant');
}

if (!service.can(admin, 'documents.approve')) {
  throw new Error('Admin should approve documents');
}

if (service.can(client, 'documents.approve')) {
  throw new Error('Client should not approve documents');
}

const runtime = createEnterpriseRuntime();

if (!runtime.rbac) {
  throw new Error('Runtime does not expose RBAC service');
}

if (!runtime.can('user_platform_owner', 'admin.system')) {
  throw new Error('Platform owner should have admin.system permission');
}

const summary = runtime.summary();

if (summary.roles !== 5) {
  throw new Error('Runtime summary should include 5 roles');
}

console.log('Enterprise RBAC engine verified');
console.log(summary);
