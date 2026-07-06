const { ApiServiceBoundary } = require('./api-boundary');
const { defaultApplicationServiceRegistry } = require('../application');
const { defaultDomainServiceRegistry } = require('../domain');

function enterpriseApiBoundaryMiddleware({
  applicationServices = defaultApplicationServiceRegistry,
  domainServices = defaultDomainServiceRegistry,
} = {}) {
  return function attachEnterpriseApiBoundary(req, res, next) {
    req.apiBoundary = new ApiServiceBoundary({
      applicationServices,
      domainServices,
    });

    return next();
  };
}

module.exports = {
  enterpriseApiBoundaryMiddleware,
};
