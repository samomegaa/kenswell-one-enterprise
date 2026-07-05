const models = require('../../database/models');
const ClientApprovalRepository = require('./ClientApprovalRepository');

module.exports = {
  clientApprovalRepository: new ClientApprovalRepository(models),
};
