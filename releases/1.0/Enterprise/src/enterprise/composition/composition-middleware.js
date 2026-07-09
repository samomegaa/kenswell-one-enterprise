const { createEnterpriseCompositionRoot } = require('./composition-root');

function enterpriseCompositionMiddleware(compositionRoot = createEnterpriseCompositionRoot()) {
  return function attachEnterpriseComposition(req, res, next) {
    req.compositionRoot = compositionRoot;
    return next();
  };
}

module.exports = {
  enterpriseCompositionMiddleware,
};
