const { createConfigurationProvider } = require('./configuration-provider');

function enterpriseConfigurationMiddleware(provider = createConfigurationProvider()) {
  return function attachEnterpriseConfiguration(req, res, next) {
    req.configuration = provider;
    return next();
  };
}

module.exports = {
  enterpriseConfigurationMiddleware,
};
