const ClientTaskService = require('./ClientTaskService');

module.exports = {
  clientTaskService: new ClientTaskService(),
  ...require('./task.constants'),
};
