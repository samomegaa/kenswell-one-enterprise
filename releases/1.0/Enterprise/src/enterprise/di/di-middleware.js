const { createEnterpriseContainer } = require('./container');

function enterpriseDiMiddleware(container = createEnterpriseContainer()) {
  return function attachEnterpriseContainer(req, res, next) {
    req.container = container;
    return next();
  };
}

module.exports = {
  enterpriseDiMiddleware,
};
