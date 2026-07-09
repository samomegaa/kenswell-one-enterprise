const { createSearchProvider } = require('./search-provider');

function enterpriseSearchMiddleware(provider = createSearchProvider()) {
  return function attachEnterpriseSearch(req, res, next) {
    req.search = provider;
    return next();
  };
}

module.exports = {
  enterpriseSearchMiddleware,
};
