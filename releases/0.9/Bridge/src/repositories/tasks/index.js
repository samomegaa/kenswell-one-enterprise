const models = require('../../database/models');
const ClientTaskRepository = require('./ClientTaskRepository');

module.exports = {
  clientTaskRepository: new ClientTaskRepository(models),
};
