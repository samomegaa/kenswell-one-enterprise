const {
  PlatformOperationStatus,
} = require('./operation-types');

const {
  OperationRegistry,
} = require('./operation-registry');

const {
  PlatformOperationExecutionError,
} = require('./operation-errors');

class PlatformOperationsService {
  constructor({
    registry = new OperationRegistry(),
    host = null,
    configuration = null,
    repositories = null,
    scheduler = null,
    notifications = null,
    search = null,
    integrations = null,
    intelligence = null,
    compositionRoot = null,
  } = {}) {
    this.registry = registry;
    this.host = host;
    this.configuration = configuration;
    this.repositories = repositories;
    this.scheduler = scheduler;
    this.notifications = notifications;
    this.search = search;
    this.integrations = integrations;
    this.intelligence = intelligence;
    this.compositionRoot = compositionRoot;
  }

  register(operation, options = {}) {
    return this.registry.register(operation, options);
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

  makeAvailable(name) {
    return this.registry.updateStatus(
      name,
      PlatformOperationStatus.AVAILABLE
    );
  }

  disable(name) {
    return this.registry.updateStatus(
      name,
      PlatformOperationStatus.DISABLED
    );
  }

  findByType(type) {
    return this.registry.findByType(type);
  }

  createContext(record) {
    return Object.freeze({
      operationName: record.name,
      operationType: record.type,
      status: record.status,

      host: this.host,

      configuration: this.configuration,
      repositories: this.repositories,
      scheduler: this.scheduler,
      notifications: this.notifications,
      search: this.search,
      integrations: this.integrations,
      intelligence: this.intelligence,

      compositionRoot: this.compositionRoot,

      metadata: record.metadata || {},

      createdAt: new Date().toISOString(),
    });
  }

  async execute(name, input = {}) {
    const record = this.registry.get(name);

    if (record.status !== PlatformOperationStatus.AVAILABLE) {
      throw new PlatformOperationExecutionError(
        'operation is not available',
        {
          operation: name,
          status: record.status,
        }
      );
    }

    try {
      const result = await record.operation.execute(
        this.createContext(record),
        input
      );

      return Object.freeze({
        ok: true,
        operation: name,
        type: record.type,
        result,
      });

    } catch (error) {

      this.registry.updateStatus(
        name,
        PlatformOperationStatus.FAILED,
        {
          error: error.message,
        }
      );

      throw new PlatformOperationExecutionError(
        'operation execution failed',
        {
          operation: name,
          error: error.message,
        }
      );
    }
  }

  snapshot() {
    return Object.freeze({
      operations: this.list().length,
      available: this.list().filter(
        o => o.status === PlatformOperationStatus.AVAILABLE
      ).length,
      hostAvailable: Boolean(this.host),
      repositoryAvailable: Boolean(this.repositories),
      schedulerAvailable: Boolean(this.scheduler),
      notificationAvailable: Boolean(this.notifications),
      searchAvailable: Boolean(this.search),
      integrationAvailable: Boolean(this.integrations),
      intelligenceAvailable: Boolean(this.intelligence),
      generatedAt: new Date().toISOString(),
    });
  }
}

function createPlatformOperationsService(options = {}) {
  return new PlatformOperationsService(options);
}

module.exports = {
  PlatformOperationsService,
  createPlatformOperationsService,
};
