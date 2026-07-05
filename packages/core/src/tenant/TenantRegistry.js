class TenantRegistry {
  constructor({ tenants = [] } = {}) {
    this.tenants = new Map();

    for (const tenant of tenants) {
      this.register(tenant);
    }
  }

  register(tenant) {
    if (!tenant || !tenant.id || !tenant.name) {
      throw new Error('Tenant must include id and name');
    }

    if (this.tenants.has(tenant.id)) {
      throw new Error(`Tenant already registered: ${tenant.id}`);
    }

    this.tenants.set(tenant.id, {
      status: 'active',
      organisations: [],
      ...tenant,
    });

    return this.get(tenant.id);
  }

  get(id) {
    return this.tenants.get(id) || null;
  }

  list() {
    return Array.from(this.tenants.values());
  }

  active() {
    return this.list().filter((tenant) => tenant.status === 'active');
  }

  has(id) {
    return this.tenants.has(id);
  }
}

module.exports = TenantRegistry;
