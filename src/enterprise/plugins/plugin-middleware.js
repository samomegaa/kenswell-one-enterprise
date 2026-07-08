const { createPluginManager } = require('./plugin-manager');

function enterprisePluginMiddleware(manager = createPluginManager()) {
  return function attachEnterprisePlugins(req, res, next) {
    req.plugins = manager;
    return next();
  };
}

module.exports = {
  enterprisePluginMiddleware,
};
