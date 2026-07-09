const { createModuleLifecycleManager } = require('./module-lifecycle-manager');

function enterpriseModuleLifecycleMiddleware(manager = createModuleLifecycleManager()) {
  return function attachEnterpriseModuleLifecycle(req, res, next) {
    req.moduleLifecycle = manager;
    return next();
  };
}

module.exports = {
  enterpriseModuleLifecycleMiddleware,
};
