const { createRepositoryProvider } = require('./repository-provider');
const { createRepositorySession } = require('./repository-session');

function enterpriseRepositoryMiddleware(provider = createRepositoryProvider()) {
  return function attachEnterpriseRepository(req, res, next) {
    req.repositories = provider;
    req.repositorySession = createRepositorySession({
      metadata: {
        requestId: req.id || req.requestId || null,
      },
    });

    return next();
  };
}

module.exports = {
  enterpriseRepositoryMiddleware,
};
