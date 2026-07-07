const { createEnterpriseCompositionRoot } = require('./composition-root');

const {
  CompositionRegistry,
  defaultCompositionRegistry,
} = require('./composition-registry');

const { enterpriseCompositionMiddleware } = require('./composition-middleware');

const {
  EnterpriseCompositionError,
  CompositionRootError,
  CompositionRegistryError,
} = require('./composition-errors');

module.exports = {
  createEnterpriseCompositionRoot,

  CompositionRegistry,
  defaultCompositionRegistry,

  enterpriseCompositionMiddleware,

  EnterpriseCompositionError,
  CompositionRootError,
  CompositionRegistryError,
};
