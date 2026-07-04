const models = require('../../database/models');
const NotificationRepository = require('./NotificationRepository');

module.exports = {
  notificationRepository: new NotificationRepository(models),
};
