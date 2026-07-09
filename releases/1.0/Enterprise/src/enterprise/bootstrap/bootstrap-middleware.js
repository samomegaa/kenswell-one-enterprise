const { createPlatformBootstrap } = require('./platform-bootstrap');

function enterpriseBootstrapMiddleware(platform = createPlatformBootstrap()) {
  return function attachEnterpriseBootstrap(req, res, next) {
    req.platform = platform;
    req.enterpriseHost = platform.host;
    return next();
  };
}

module.exports = {
  enterpriseBootstrapMiddleware,
};
