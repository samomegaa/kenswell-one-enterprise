const {
  IntegrationStatus,
} = require('./integration-types');

const {
  IntegrationRegistry,
} = require('./integration-registry');

const {
  IntegrationExecutionError,
} = require('./integration-errors');

class IntegrationProvider {
  constructor({
    registry = new IntegrationRegistry(),
    scheduler = null,
    repositories = null,
    notifications = null,
    search = null,
    configuration = null,
    compositionRoot = null,
  } = {}) {
    this.registry = registry;
    this.scheduler = scheduler;
    this.repositories = repositories;
    this.notifications = notifications;
    this.search = search;
    this.configuration = configuration;
    this.compositionRoot = compositionRoot;
  }

  register(connector, options = {}) {
    return this.registry.register(connector, options);
  }

  has(name) {
    return this.registry.has(name);
  }

  get(name) {
    return this.registry.get(name);
  }

  list() {
    return this.registry.list();
  }

  connect(name) {
    const record = this.registry.get(name);

    if (record.status === IntegrationStatus.CONNECTED) {
      return record;
    }

    if (record.status === IntegrationStatus.FAILED) {
      throw new IntegrationExecutionError('failed integration cannot be connected without re-registration', {
        integration: name,
        status: record.status,
      });
    }

    return this.registry.updateStatus(name, IntegrationStatus.CONNECTED);
  }

  disconnect(name) {
    const record = this.registry.get(name);

    if (record.status !== IntegrationStatus.CONNECTED) {
      throw new IntegrationExecutionError('integration cannot be disconnected from current status', {
        integration: name,
        status: record.status,
      });
    }

    return this.registry.updateStatus(name, IntegrationStatus.DISCONNECTED);
  }

  createContext(record) {
    return Object.freeze({
      integrationName: record.name,
      protocol: record.protocol,
      status: record.status,
      scheduler: this.scheduler,
      repositories: this.repositories,
      notifications: this.notifications,
      search: this.search,
      configuration: this.configuration,
      compositionRoot: this.compositionRoot,
      metadata: record.metadata || {},
      createdAt: new Date().toISOString(),
    });
  }

  async execute(name, request = {}) {
    const record = this.registry.get(name);

    if (record.status !== IntegrationStatus.CONNECTED) {
      throw new IntegrationExecutionError('integration must be connected before execution', {
        integration: name,
        status: record.status,
      });
    }

    try {
      const result = await record.connector.execute(this.createContext(record), request);

      return Object.freeze({
        ok: true,
        integration: name,
        protocol: record.protocol,
        result,
      });
    } catch (error) {
      this.registry.updateStatus(name, IntegrationStatus.FAILED, {
        error: error.message,
      });

      throw new IntegrationExecutionError('integration execution failed', {
        integration: name,
        error: error.message,
      });
    }
  }
}

function createIntegrationProvider(options = {}) {
  return new IntegrationProvider(options);
}

module.exports = {
  IntegrationProvider,
  createIntegrationProvider,
};
