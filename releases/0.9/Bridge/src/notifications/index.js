const NotificationService = require('./NotificationService');

module.exports = {
  notificationService: new NotificationService(),
  NullEmailProvider: require('./providers/NullEmailProvider'),
  ...require('./notification.constants'),
};
