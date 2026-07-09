const { PlatformOperationStatus } = require('./operation-types');

const {
  PlatformOperationRegistrationError,
  PlatformOperationNotFoundError,
} = require('./operation-errors');

function freezeOperationRecord(record) {
  return Object.freeze({
    ...record,
    metadata: Object.freeze({
      ...(record.metadata || {}),
    }),
  });
}

class OperationRegistry {
  constructor() {
    this.operations = new Map();
  }

  register(operation, options = {}) {
    if (!operation || typeof operation !== 'object') {
      throw new PlatformOperationRegistrationError('platform operation is required');
    }

    if (!operation.name || typeof operation.name !== 'string') {
      throw new PlatformOperationRegistrationError('operation name is required');
    }

    if (!operation.type || typeof operation.type !== 'string') {
      throw new PlatformOperationRegistrationError('operation type is required', {
        operation: operation.name,
      });
    }

    if (this.operations.has(operation.name)) {
      throw new PlatformOperationRegistrationError('operation already registered', {
        operation: operation.name,
      });
    }

    const record = {
      name: operation.name,
      type: operation.type,
      operation,
      status: PlatformOperationStatus.REGISTERED,
      metadata: {
        ...(operation.metadata || {}),
        ...(options.metadata || {}),
      },
      registeredAt: new Date().toISOString(),
      availableAt: null,
      disabledAt: null,
      failedAt: null,
      lastError: null,
    };

    this.operations.set(operation.name, record);

    return freezeOperationRecord(record);
  }

  has(name) {
    return this.operations.has(name);
  }

  get(name) {
    const record = this.operations.get(name);

    if (!record) {
      throw new PlatformOperationNotFoundError(
        'operation not registered',
        { operation: name }
      );
    }

    return freezeOperationRecord(record);
  }

  getOperation(name) {
    return this.get(name).operation;
  }

  updateStatus(name, status, details = {}) {
    const record = this.operations.get(name);

    if (!record) {
      throw new PlatformOperationNotFoundError(
        'operation not registered',
        { operation: name }
      );
    }

    record.status = status;

    if (status === PlatformOperationStatus.AVAILABLE) {
      record.availableAt = new Date().toISOString();
    }

    if (status === PlatformOperationStatus.DISABLED) {
      record.disabledAt = new Date().toISOString();
    }

    if (status === PlatformOperationStatus.FAILED) {
      record.failedAt = new Date().toISOString();
      record.lastError = details.error || null;
    }

    return freezeOperationRecord(record);
  }

  findByType(type) {
    return this.list().filter((record) => record.type === type);
  }

  list() {
    return Array.from(this.operations.values()).map(freezeOperationRecord);
  }

  clear() {
    this.operations.clear();
  }
}

const defaultOperationRegistry = new OperationRegistry();

module.exports = {
  OperationRegistry,
  defaultOperationRegistry,
};
