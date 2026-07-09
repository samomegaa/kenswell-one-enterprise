const {
  createPlatformOperationsService,
} = require('./platform-operations');

function enterpriseOperationsMiddleware(
  operations = createPlatformOperationsService()
) {
  return function attachEnterpriseOperations(req, res, next) {
    req.operations = operations;
    return next();
  };
}

module.exports = {
  enterpriseOperationsMiddleware,
};
