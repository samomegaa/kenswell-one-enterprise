const { AiProviderStatus } = require('./ai-types');

const {
  AiProviderRegistrationError,
  AiProviderNotFoundError,
} = require('./ai-errors');

function freezeProviderRecord(record) {
  return Object.freeze({
    ...record,
    capabilities: Object.freeze([...(record.capabilities || [])]),
    metadata: Object.freeze({
      ...(record.metadata || {}),
    }),
  });
}

class AiProviderRegistry {
  constructor() {
    this.providers = new Map();
  }

  register(provider, options = {}) {
    if (!provider || typeof provider !== 'object') {
      throw new AiProviderRegistrationError('AI provider instance is required');
    }

    if (!provider.name || typeof provider.name !== 'string') {
      throw new AiProviderRegistrationError('AI provider name is required');
    }

    if (this.providers.has(provider.name)) {
      throw new AiProviderRegistrationError('AI provider already registered', {
        provider: provider.name,
      });
    }

    const record = {
      name: provider.name,
      provider,
      capabilities: provider.capabilities || [],
      status: AiProviderStatus.REGISTERED,
      metadata: {
        ...(provider.metadata || {}),
        ...(options.metadata || {}),
      },
      registeredAt: new Date().toISOString(),
      availableAt: null,
      unavailableAt: null,
      failedAt: null,
      lastError: null,
    };

    this.providers.set(provider.name, record);

    return freezeProviderRecord(record);
  }

  has(name) {
    return this.providers.has(name);
  }

  get(name) {
    const record = this.providers.get(name);

    if (!record) {
      throw new AiProviderNotFoundError('AI provider not registered', {
        provider: name,
      });
    }

    return freezeProviderRecord(record);
  }

  getProvider(name) {
    return this.get(name).provider;
  }

  updateStatus(name, status, details = {}) {
    const record = this.providers.get(name);

    if (!record) {
      throw new AiProviderNotFoundError('AI provider not registered', {
        provider: name,
      });
    }

    record.status = status;

    if (status === AiProviderStatus.AVAILABLE) {
      record.availableAt = new Date().toISOString();
    }

    if (status === AiProviderStatus.UNAVAILABLE) {
      record.unavailableAt = new Date().toISOString();
    }

    if (status === AiProviderStatus.FAILED) {
      record.failedAt = new Date().toISOString();
      record.lastError = details.error || null;
    }

    return freezeProviderRecord(record);
  }

  findByCapability(capability) {
    return this.list().filter((record) => {
      return record.capabilities.includes(capability);
    });
  }

  list() {
    return Array.from(this.providers.values()).map(freezeProviderRecord);
  }

  clear() {
    this.providers.clear();
  }
}

const defaultAiProviderRegistry = new AiProviderRegistry();

module.exports = {
  AiProviderRegistry,
  defaultAiProviderRegistry,
};
