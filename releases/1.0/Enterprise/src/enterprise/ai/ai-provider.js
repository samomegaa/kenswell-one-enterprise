const {
  AiProviderRegistrationError,
} = require('./ai-errors');

class EnterpriseAiProvider {
  constructor({
    name,
    capabilities = [],
    metadata = {},
  } = {}) {
    if (!name || typeof name !== 'string') {
      throw new AiProviderRegistrationError('AI provider name is required');
    }

    this.name = name;
    this.capabilities = Object.freeze([...capabilities]);
    this.metadata = Object.freeze({ ...metadata });
  }

  supports(capability) {
    return this.capabilities.includes(capability);
  }

  async execute() {
    throw new AiProviderRegistrationError(
      'execute() must be implemented',
      {
        provider: this.name,
      }
    );
  }

  describe() {
    return Object.freeze({
      name: this.name,
      capabilities: this.capabilities,
      metadata: this.metadata,
    });
  }
}

module.exports = {
  EnterpriseAiProvider,
};
