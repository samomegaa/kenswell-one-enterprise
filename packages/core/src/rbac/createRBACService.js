const fs = require('fs');
const path = require('path');

const PermissionEngine = require('./PermissionEngine');
const RBACService = require('./RBACService');

function createRBACService({
  identityService = null,
  permissionsPath = path.join(__dirname, 'permissions.json'),
  rolesPath = path.join(__dirname, 'roles.json'),
} = {}) {
  const permissionsManifest = JSON.parse(fs.readFileSync(permissionsPath, 'utf8'));
  const rolesManifest = JSON.parse(fs.readFileSync(rolesPath, 'utf8'));

  const permissionEngine = new PermissionEngine({
    permissions: permissionsManifest.permissions || [],
    roles: rolesManifest.roles || {},
  });

  return new RBACService({
    permissionEngine,
    identityService,
  });
}

module.exports = createRBACService;
