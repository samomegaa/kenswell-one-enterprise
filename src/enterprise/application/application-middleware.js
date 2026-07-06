const { defaultApplicationServiceRegistry } = require('./application-service-registry');

function enterpriseApplicationMiddleware(registry = defaultApplicationServiceRegistry) {
  return function attachEnterpriseApplication(req, res, next) {
    req.applicationServices = registry;
    return next();
  };
}

module.exports = {
  enterpriseApplicationMiddleware,
};
