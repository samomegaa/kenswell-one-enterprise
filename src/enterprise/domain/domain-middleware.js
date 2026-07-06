const { defaultDomainServiceRegistry } = require('./domain-service-registry');

function enterpriseDomainMiddleware(registry = defaultDomainServiceRegistry) {
  return function attachEnterpriseDomain(req, res, next) {
    req.domainServices = registry;
    return next();
  };
}

module.exports = {
  enterpriseDomainMiddleware,
};
