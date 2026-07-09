const { createEnterpriseAiService } = require('./ai-service');

function enterpriseAiMiddleware(service = createEnterpriseAiService()) {
  return function attachEnterpriseAi(req, res, next) {
    req.ai = service;
    return next();
  };
}

module.exports = {
  enterpriseAiMiddleware,
};
