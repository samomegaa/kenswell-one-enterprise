const { createNotificationProvider } = require('./notification-provider');

function enterpriseNotificationMiddleware(provider = createNotificationProvider()) {
  return function attachEnterpriseNotification(req, res, next) {
    req.notifications = provider;
    return next();
  };
}

module.exports = {
  enterpriseNotificationMiddleware,
};
