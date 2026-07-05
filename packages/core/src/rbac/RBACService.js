class RBACService {
  constructor({ permissionEngine, identityService } = {}) {
    if (!permissionEngine) {
      throw new Error('RBACService requires permissionEngine');
    }

    this.permissionEngine = permissionEngine;
    this.identityService = identityService || null;
  }

  can(userOrUserId, permission) {
    const user = this.resolveUser(userOrUserId);

    if (!user) {
      return false;
    }

    return this.permissionEngine.can(user, permission);
  }

  permissions(userOrUserId) {
    const user = this.resolveUser(userOrUserId);

    if (!user) {
      return [];
    }

    return this.permissionEngine.permissions(user);
  }

  roles() {
    return this.permissionEngine.roles();
  }

  exists(permission) {
    return this.permissionEngine.exists(permission);
  }

  resolveUser(userOrUserId) {
    if (!userOrUserId) {
      return null;
    }

    if (typeof userOrUserId === 'string') {
      if (!this.identityService) {
        return null;
      }

      return this.identityService.getUser(userOrUserId);
    }

    return userOrUserId;
  }
}

module.exports = RBACService;
