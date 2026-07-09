class PermissionEngine {
  constructor({ permissions = [], roles = {} } = {}) {
    this.permissionSet = new Set(permissions);
    this.roleMap = new Map(Object.entries(roles));
  }

  exists(permission) {
    if (permission === '*') {
      return true;
    }

    return this.permissionSet.has(permission);
  }

  roles() {
    return Array.from(this.roleMap.keys());
  }

  rolePermissions(role) {
    return this.roleMap.get(role) || [];
  }

  permissionsForRoles(roles = []) {
    const resolved = new Set();

    for (const role of roles || []) {
      for (const permission of this.rolePermissions(role)) {
        resolved.add(permission);
      }
    }

    return Array.from(resolved);
  }

  permissions(user = {}) {
    return this.permissionsForRoles(user.roles || []);
  }

  can(user = {}, permission) {
    if (!permission) {
      return false;
    }

    const permissions = this.permissions(user);

    return permissions.some((granted) => this.matches(granted, permission));
  }

  matches(granted, requested) {
    if (granted === '*') {
      return true;
    }

    if (granted === requested) {
      return true;
    }

    if (granted.endsWith('.*')) {
      const prefix = granted.slice(0, -2);
      return requested.startsWith(`${prefix}.`);
    }

    return false;
  }
}

module.exports = PermissionEngine;
