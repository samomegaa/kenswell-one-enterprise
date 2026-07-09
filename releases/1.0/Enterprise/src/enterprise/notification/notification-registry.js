const { NotificationStatus } = require('./notification-types');

const {
  NotificationRegistrationError,
  NotificationNotFoundError,
} = require('./notification-errors');

function freezeNotificationRecord(record) {
  return Object.freeze({
    ...record,
    metadata: Object.freeze({
      ...(record.metadata || {}),
    }),
  });
}

class NotificationRegistry {
  constructor() {
    this.notifications = new Map();
  }

  register(notification, options = {}) {
    if (!notification || typeof notification !== 'object') {
      throw new NotificationRegistrationError('notification instance is required');
    }

    if (!notification.name || typeof notification.name !== 'string') {
      throw new NotificationRegistrationError('notification name is required');
    }

    if (!notification.channel || typeof notification.channel !== 'string') {
      throw new NotificationRegistrationError('notification channel is required', {
        notification: notification.name,
      });
    }

    if (this.notifications.has(notification.name)) {
      throw new NotificationRegistrationError('notification already registered', {
        notification: notification.name,
      });
    }

    const record = {
      name: notification.name,
      channel: notification.channel,
      notification,
      status: NotificationStatus.CREATED,
      metadata: {
        ...(notification.metadata || {}),
        ...(options.metadata || {}),
      },
      registeredAt: new Date().toISOString(),
      queuedAt: null,
      sentAt: null,
      failedAt: null,
      cancelledAt: null,
      lastError: null,
    };

    this.notifications.set(notification.name, record);

    return freezeNotificationRecord(record);
  }

  has(name) {
    return this.notifications.has(name);
  }

  get(name) {
    const record = this.notifications.get(name);

    if (!record) {
      throw new NotificationNotFoundError('notification not registered', {
        notification: name,
      });
    }

    return freezeNotificationRecord(record);
  }

  getNotification(name) {
    return this.get(name).notification;
  }

  updateStatus(name, status, details = {}) {
    const record = this.notifications.get(name);

    if (!record) {
      throw new NotificationNotFoundError('notification not registered', {
        notification: name,
      });
    }

    record.status = status;

    if (status === NotificationStatus.QUEUED) {
      record.queuedAt = new Date().toISOString();
    }

    if (status === NotificationStatus.SENT) {
      record.sentAt = new Date().toISOString();
    }

    if (status === NotificationStatus.FAILED) {
      record.failedAt = new Date().toISOString();
      record.lastError = details.error || null;
    }

    if (status === NotificationStatus.CANCELLED) {
      record.cancelledAt = new Date().toISOString();
    }

    return freezeNotificationRecord(record);
  }

  list() {
    return Array.from(this.notifications.values()).map(freezeNotificationRecord);
  }

  clear() {
    this.notifications.clear();
  }
}

const defaultNotificationRegistry = new NotificationRegistry();

module.exports = {
  NotificationRegistry,
  defaultNotificationRegistry,
};
