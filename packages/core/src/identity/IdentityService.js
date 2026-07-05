const {
  IDENTITY_STATUS,
  IDENTITY_TYPES,
} = require('./identity.constants');

class IdentityService {
  constructor({ users = [] } = {}) {
    this.users = new Map();

    for (const user of users) {
      this.registerUser(user);
    }
  }

  registerUser(user) {
    if (!user || !user.id || !user.email || !user.tenantId) {
      throw new Error('User must include id, email and tenantId');
    }

    if (this.users.has(user.id)) {
      throw new Error(`User already registered: ${user.id}`);
    }

    const normalised = {
      type: IDENTITY_TYPES.USER,
      status: IDENTITY_STATUS.ACTIVE,
      roles: [],
      organisationIds: [],
      departmentIds: [],
      teamIds: [],
      ...user,
      email: String(user.email).toLowerCase(),
    };

    this.users.set(normalised.id, normalised);

    return this.getUser(normalised.id);
  }

  getUser(id) {
    return this.users.get(id) || null;
  }

  findByEmail(email) {
    const normalised = String(email).toLowerCase();

    return this.listUsers().find((user) => user.email === normalised) || null;
  }

  listUsers() {
    return Array.from(this.users.values());
  }

  usersForTenant(tenantId) {
    return this.listUsers().filter((user) => user.tenantId === tenantId);
  }

  activeUsers() {
    return this.listUsers().filter((user) => user.status === IDENTITY_STATUS.ACTIVE);
  }

  hasRole(userId, role) {
    const user = this.getUser(userId);

    if (!user) {
      return false;
    }

    return Array.isArray(user.roles) && user.roles.includes(role);
  }
}

module.exports = IdentityService;
