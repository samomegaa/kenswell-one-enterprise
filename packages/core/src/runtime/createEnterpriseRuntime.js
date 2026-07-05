const EnterpriseRuntime = require('./EnterpriseRuntime');

const {
  createModuleRegistry,
} = require('../module-registry');

const {
  createFeatureFlags,
} = require('../feature-flags');

const {
  createEventBus,
} = require('../events');

function createEnterpriseRuntime({
  config = {},
  logger = null,
} = {}) {

  return new EnterpriseRuntime({

    config,

    registry: createModuleRegistry(),

    featureFlags: createFeatureFlags(),

    eventBus: createEventBus({
      logger,
    }),

  });

}

module.exports = createEnterpriseRuntime;
