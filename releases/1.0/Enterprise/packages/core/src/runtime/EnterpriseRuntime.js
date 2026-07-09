class EnterpriseRuntime {
  constructor({
    config,
    registry,
    featureFlags,
    eventBus,
    tenantRegistry,
    organisationRegistry,
    identityService,
    authenticationService,
    rbacService,
  }) {
    this.config = config;
    this.registry = registry;
    this.featureFlags = featureFlags;
    this.eventBus = eventBus;
    this.tenantRegistry = tenantRegistry;
    this.organisationRegistry = organisationRegistry;
    this.identityService = identityService;
    this.authenticationService = authenticationService;
    this.rbac = rbacService;
  }

  summary() {
    return {
      modules: this.registry.list().length,
      enabledModules: this.registry.enabled().length,
      enabledFeatures: this.featureFlags.listEnabled().length,
      disabledFeatures: this.featureFlags.listDisabled().length,
      tenants: this.tenantRegistry.list().length,
      organisations: this.organisationRegistry.list().length,
      users: this.identityService.listUsers().length,
      authenticationProviders: this.authenticationService.providers().length,
      enabledAuthenticationProviders: this.authenticationService.enabledProviders().length,
      roles: this.rbac.roles().length,
    };
  }

  enabledModules() {
    return this.registry.enabled();
  }

  featureEnabled(name) {
    return this.featureFlags.enabled(name);
  }

  publish(eventName, payload, metadata) {
    return this.eventBus.publish(eventName, payload, metadata);
  }

  getTenant(id) {
    return this.tenantRegistry.get(id);
  }

  getOrganisation(id) {
    return this.organisationRegistry.get(id);
  }

  getUser(id) {
    return this.identityService.getUser(id);
  }

  authenticate(credentials, providerId) {
    return this.authenticationService.authenticate(credentials, providerId);
  }

  can(userOrUserId, permission) {
    return this.rbac.can(userOrUserId, permission);
  }
}

module.exports = EnterpriseRuntime;
