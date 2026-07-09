class EnterpriseNotificationError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseNotificationError';
    this.details = details;
    this.statusCode = 500;
  }
}

class NotificationRegistrationError extends EnterpriseNotificationError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'NotificationRegistrationError';
  }
}

class NotificationNotFoundError extends EnterpriseNotificationError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'NotificationNotFoundError';
    this.statusCode = 404;
  }
}

class NotificationDeliveryError extends EnterpriseNotificationError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'NotificationDeliveryError';
  }
}

module.exports = {
  EnterpriseNotificationError,
  NotificationRegistrationError,
  NotificationNotFoundError,
  NotificationDeliveryError,
};
