const {
  NotificationRegistrationError,
} = require('./notification-errors');

class EnterpriseNotification {
  constructor({
    name,
    channel,
    metadata = {},
  } = {}) {
    if (!name || typeof name !== 'string') {
      throw new NotificationRegistrationError('notification name is required');
    }

    this.name = name;
    this.channel = channel;
    this.metadata = Object.freeze({ ...metadata });
  }

  async send() {
    throw new NotificationRegistrationError(
      'send() must be implemented',
      {
        notification: this.name,
      }
    );
  }

  describe() {
    return Object.freeze({
      name: this.name,
      channel: this.channel,
      metadata: this.metadata,
    });
  }
}

module.exports = {
  EnterpriseNotification,
};
