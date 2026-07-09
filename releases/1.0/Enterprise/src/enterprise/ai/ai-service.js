const {
  AiProviderStatus,
  AiRequestType,
  AiCapability,
} = require('./ai-types');

const {
  AiProviderRegistry,
} = require('./ai-provider-registry');

const {
  AiExecutionError,
} = require('./ai-errors');

class EnterpriseAiService {
  constructor({
    registry = new AiProviderRegistry(),
    repositories = null,
    scheduler = null,
    notifications = null,
    search = null,
    integrations = null,
    configuration = null,
    compositionRoot = null,
  } = {}) {
    this.registry = registry;
    this.repositories = repositories;
    this.scheduler = scheduler;
    this.notifications = notifications;
    this.search = search;
    this.integrations = integrations;
    this.configuration = configuration;
    this.compositionRoot = compositionRoot;
  }

  register(provider, options = {}) {
    return this.registry.register(provider, options);
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
    return this.registry.updateStatus(name, AiProviderStatus.AVAILABLE);
  }

  makeUnavailable(name) {
    return this.registry.updateStatus(name, AiProviderStatus.UNAVAILABLE);
  }

  findByCapability(capability) {
    return this.registry.findByCapability(capability);
  }

  selectProvider(capability, preferredProvider = null) {
    if (preferredProvider) {
      const record = this.registry.get(preferredProvider);

      if (record.status !== AiProviderStatus.AVAILABLE) {
        throw new AiExecutionError('preferred AI provider is not available', {
          provider: preferredProvider,
          status: record.status,
        });
      }

      if (!record.capabilities.includes(capability)) {
        throw new AiExecutionError('preferred AI provider does not support capability', {
          provider: preferredProvider,
          capability,
        });
      }

      return record;
    }

    const available = this.findByCapability(capability).filter((record) => {
      return record.status === AiProviderStatus.AVAILABLE;
    });

    if (available.length === 0) {
      throw new AiExecutionError('no available AI provider supports capability', {
        capability,
      });
    }

    return available[0];
  }

  createContext(record) {
    return Object.freeze({
      providerName: record.name,
      capabilities: record.capabilities,
      status: record.status,
      repositories: this.repositories,
      scheduler: this.scheduler,
      notifications: this.notifications,
      search: this.search,
      integrations: this.integrations,
      configuration: this.configuration,
      compositionRoot: this.compositionRoot,
      metadata: record.metadata || {},
      createdAt: new Date().toISOString(),
    });
  }

  async execute({
    type,
    capability,
    input = {},
    provider = null,
    metadata = {},
  } = {}) {
    if (!type || !Object.values(AiRequestType).includes(type)) {
      throw new AiExecutionError('valid AI request type is required', {
        type,
      });
    }

    if (!capability || !Object.values(AiCapability).includes(capability)) {
      throw new AiExecutionError('valid AI capability is required', {
        capability,
      });
    }

    const selected = this.selectProvider(capability, provider);

    try {
      const result = await selected.provider.execute(
        this.createContext(selected),
        Object.freeze({
          type,
          capability,
          input,
          metadata,
        })
      );

      return Object.freeze({
        ok: true,
        type,
        capability,
        provider: selected.name,
        result,
      });
    } catch (error) {
      this.registry.updateStatus(selected.name, AiProviderStatus.FAILED, {
        error: error.message,
      });

      throw new AiExecutionError('AI execution failed', {
        provider: selected.name,
        capability,
        error: error.message,
      });
    }
  }

  generate(input, options = {}) {
    return this.execute({
      type: AiRequestType.GENERATE,
      capability: AiCapability.TEXT_GENERATION,
      input,
      provider: options.provider || null,
      metadata: options.metadata || {},
    });
  }

  reason(input, options = {}) {
    return this.execute({
      type: AiRequestType.REASON,
      capability: AiCapability.REASONING,
      input,
      provider: options.provider || null,
      metadata: options.metadata || {},
    });
  }

  embed(input, options = {}) {
    return this.execute({
      type: AiRequestType.EMBED,
      capability: AiCapability.EMBEDDING,
      input,
      provider: options.provider || null,
      metadata: options.metadata || {},
    });
  }
}

function createEnterpriseAiService(options = {}) {
  return new EnterpriseAiService(options);
}

module.exports = {
  EnterpriseAiService,
  createEnterpriseAiService,
};
