const core = require('../../../../packages/core/src');

function buildRbacPermissionFlow() {
  return Object.freeze({
    rbac: core.rbac,
    context: core.context,
  });
}

function createPermissionContext({
  permissions = [],
  roles = [],
} = {}) {
  return Object.freeze({
    rbac: {
      roles,
      permissions,
    },
  });
}

function hasPermission(context, permission) {
  return Boolean(
    context &&
    context.rbac &&
    Array.isArray(context.rbac.permissions) &&
    context.rbac.permissions.includes(permission)
  );
}

module.exports = {
  buildRbacPermissionFlow,
  createPermissionContext,
  hasPermission,
};
