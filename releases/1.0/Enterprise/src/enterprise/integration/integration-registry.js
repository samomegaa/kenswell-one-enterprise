const { IntegrationStatus } = require('./integration-types');

const {
  IntegrationRegistrationError,
  IntegrationNotFoundError,
} = require('./integration-errors');

function freezeIntegrationRecord(record) {
  return Object.freeze({
    ...record,
    metadata: Object.freeze({
      ...(record.metadata || {}),
    }),
  });
}

class IntegrationRegistry {
  constructor() {
    this.integrations = new Map();
  }

  register(connector, options = {}) {
    if (!connector || typeof connector !== 'object') {
      throw new IntegrationRegistrationError('integration connector is required');
    }

    if (!connector.name || typeof connector.name !== 'string') {
      throw new IntegrationRegistrationError('integration name is required');
    }

    if (!connector.protocol || typeof connector.protocol !== 'string') {
      throw new IntegrationRegistrationError('integration protocol is required', {
        integration: connector.name,
      });
    }

    if (this.integrations.has(connector.name)) {
      throw new IntegrationRegistrationError('integration already registered', {
        integration: connector.name,
      });
    }

    const record = {
      name: connector.name,
      protocol: connector.protocol,
      connector,
      status: IntegrationStatus.REGISTERED,
      metadata: {
        ...(connector.metadata || {}),
        ...(options.metadata || {}),
      },
      registeredAt: new Date().toISOString(),
      connectedAt: null,
      disconnectedAt: null,
      failedAt: null,
      lastError: null,
    };

    this.integrations.set(connector.name, record);

    return freezeIntegrationRecord(record);
  }

  has(name) {
    return this.integrations.has(name);
  }

  get(name) {
    const record = this.integrations.get(name);

    if (!record) {
      throw new IntegrationNotFoundError('integration not registered', {
        integration: name,
      });
    }

    return freezeIntegrationRecord(record);
  }

  getConnector(name) {
    return this.get(name).connector;
  }

  updateStatus(name, status, details = {}) {
    const record = this.integrations.get(name);

    if (!record) {
      throw new IntegrationNotFoundError('integration not registered', {
        integration: name,
      });
    }

    record.status = status;

    if (status === IntegrationStatus.CONNECTED) {
      record.connectedAt = new Date().toISOString();
    }

    if (status === IntegrationStatus.DISCONNECTED) {
      record.disconnectedAt = new Date().toISOString();
    }

    if (status === IntegrationStatus.FAILED) {
      record.failedAt = new Date().toISOString();
      record.lastError = details.error || null;
    }

    return freezeIntegrationRecord(record);
  }

  list() {
    return Array.from(this.integrations.values()).map(freezeIntegrationRecord);
  }

  clear() {
    this.integrations.clear();
  }
}

const defaultIntegrationRegistry = new IntegrationRegistry();

module.exports = {
  IntegrationRegistry,
  defaultIntegrationRegistry,
};
