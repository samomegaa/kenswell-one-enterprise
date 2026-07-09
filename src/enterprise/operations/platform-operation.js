const {
  PlatformOperationRegistrationError,
} = require('./operation-errors');

class PlatformOperation {
  constructor({
    name,
    type,
    metadata = {},
  } = {}) {
    if (!name || typeof name !== 'string') {
      throw new PlatformOperationRegistrationError('operation name is required');
    }

    this.name = name;
    this.type = type;
    this.metadata = Object.freeze({ ...metadata });
  }

  async execute() {
    throw new PlatformOperationRegistrationError(
      'execute() must be implemented',
      {
        operation: this.name,
      }
    );
  }

  describe() {
    return Object.freeze({
      name: this.name,
      type: this.type,
      metadata: this.metadata,
    });
  }
}

module.exports = {
  PlatformOperation,
};
