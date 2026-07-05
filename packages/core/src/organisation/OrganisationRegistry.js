class OrganisationRegistry {
  constructor({ organisations = [] } = {}) {
    this.organisations = new Map();

    for (const organisation of organisations) {
      this.register(organisation);
    }
  }

  register(organisation) {
    if (!organisation || !organisation.id || !organisation.tenantId || !organisation.name) {
      throw new Error('Organisation must include id, tenantId and name');
    }

    if (this.organisations.has(organisation.id)) {
      throw new Error(`Organisation already registered: ${organisation.id}`);
    }

    this.organisations.set(organisation.id, {
      status: 'active',
      departments: [],
      teams: [],
      ...organisation,
    });

    return this.get(organisation.id);
  }

  get(id) {
    return this.organisations.get(id) || null;
  }

  list() {
    return Array.from(this.organisations.values());
  }

  forTenant(tenantId) {
    return this.list().filter((organisation) => organisation.tenantId === tenantId);
  }

  active() {
    return this.list().filter((organisation) => organisation.status === 'active');
  }

  has(id) {
    return this.organisations.has(id);
  }
}

module.exports = OrganisationRegistry;
