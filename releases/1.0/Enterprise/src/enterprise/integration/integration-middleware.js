const { createIntegrationProvider } = require('./integration-provider');

function enterpriseIntegrationMiddleware(provider = createIntegrationProvider()) {
  return function attachEnterpriseIntegration(req, res, next) {
    req.integrations = provider;
    return next();
  };
}

module.exports = {
  enterpriseIntegrationMiddleware,
};
