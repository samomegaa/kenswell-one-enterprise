const ClientApprovalService = require('./ClientApprovalService');

module.exports = {
  clientApprovalService: new ClientApprovalService(),
  ...require('./approval.constants'),
};
