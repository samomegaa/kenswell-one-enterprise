const {
  IntegrationRegistrationError,
} = require('./integration-errors');

class EnterpriseIntegrationConnector {
  constructor({
    name,
    protocol,
    metadata = {},
  } = {}) {
    if (!name || typeof name !== 'string') {
      throw new IntegrationRegistrationError('integration name is required');
    }

    this.name = name;
    this.protocol = protocol;
    this.metadata = Object.freeze({ ...metadata });
  }

  async execute() {
    throw new IntegrationRegistrationError(
      'execute() must be implemented',
      {
        integration: this.name,
      }
    );
  }

  describe() {
    return Object.freeze({
      name: this.name,
      protocol: this.protocol,
      metadata: this.metadata,
    });
  }
}

module.exports = {
  EnterpriseIntegrationConnector,
};
