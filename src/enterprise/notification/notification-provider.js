const {
  NotificationStatus,
} = require('./notification-types');

const {
  NotificationRegistry,
} = require('./notification-registry');

const {
  NotificationDeliveryError,
} = require('./notification-errors');

class NotificationProvider {
  constructor({
    registry = new NotificationRegistry(),
    scheduler = null,
    repositories = null,
    configuration = null,
    compositionRoot = null,
  } = {}) {
    this.registry = registry;
    this.scheduler = scheduler;
    this.repositories = repositories;
    this.configuration = configuration;
    this.compositionRoot = compositionRoot;
  }

  register(notification, options = {}) {
    return this.registry.register(notification, options);
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

  createContext(record) {
    return Object.freeze({
      notificationName: record.name,
      channel: record.channel,
      status: record.status,
      scheduler: this.scheduler,
      repositories: this.repositories,
      configuration: this.configuration,
      compositionRoot: this.compositionRoot,
      metadata: record.metadata || {},
      createdAt: new Date().toISOString(),
    });
  }

  queue(name) {
    const record = this.registry.get(name);

    if (record.status !== NotificationStatus.CREATED) {
      throw new NotificationDeliveryError('notification cannot be queued from current status', {
        notification: name,
        status: record.status,
      });
    }

    return this.registry.updateStatus(name, NotificationStatus.QUEUED);
  }

  cancel(name) {
    const record = this.registry.get(name);

    if (
      record.status === NotificationStatus.SENT ||
      record.status === NotificationStatus.FAILED ||
      record.status === NotificationStatus.CANCELLED
    ) {
      throw new NotificationDeliveryError('notification cannot be cancelled from current status', {
        notification: name,
        status: record.status,
      });
    }

    return this.registry.updateStatus(name, NotificationStatus.CANCELLED);
  }

  async send(name, message = {}) {
    const record = this.registry.get(name);

    if (
      record.status !== NotificationStatus.CREATED &&
      record.status !== NotificationStatus.QUEUED
    ) {
      throw new NotificationDeliveryError('notification cannot be sent from current status', {
        notification: name,
        status: record.status,
      });
    }

    try {
      const result = await record.notification.send(this.createContext(record), message);

      const sent = this.registry.updateStatus(name, NotificationStatus.SENT);

      return Object.freeze({
        ok: true,
        notification: name,
        channel: record.channel,
        status: sent.status,
        result,
      });
    } catch (error) {
      this.registry.updateStatus(name, NotificationStatus.FAILED, {
        error: error.message,
      });

      throw new NotificationDeliveryError('notification delivery failed', {
        notification: name,
        error: error.message,
      });
    }
  }
}

function createNotificationProvider(options = {}) {
  return new NotificationProvider(options);
}

module.exports = {
  NotificationProvider,
  createNotificationProvider,
};
