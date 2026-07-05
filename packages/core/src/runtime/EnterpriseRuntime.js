class EnterpriseRuntime {
  constructor({
    config,
    registry,
    featureFlags,
    eventBus,
  }) {
    this.config = config;
    this.registry = registry;
    this.featureFlags = featureFlags;
    this.eventBus = eventBus;
  }

  summary() {
    return {
      modules: this.registry.list().length,
      enabledModules: this.registry.enabled().length,
      enabledFeatures: this.featureFlags.listEnabled().length,
      disabledFeatures: this.featureFlags.listDisabled().length,
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
}

module.exports = EnterpriseRuntime;
