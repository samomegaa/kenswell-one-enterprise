const {
  ModuleLifecycleState,
  ModuleLifecycleTransition,
} = require('./module-lifecycle-state');

const {
  ModuleLifecycleRegistry,
  defaultModuleLifecycleRegistry,
} = require('./module-lifecycle-registry');

const {
  ModuleLifecycleManager,
  createModuleLifecycleManager,
} = require('./module-lifecycle-manager');

const { enterpriseModuleLifecycleMiddleware } = require('./module-lifecycle-middleware');

const {
  EnterpriseModuleLifecycleError,
  ModuleRegistrationError,
  ModuleLifecycleTransitionError,
  ModuleNotFoundError,
} = require('./module-lifecycle-errors');

module.exports = {
  ModuleLifecycleState,
  ModuleLifecycleTransition,

  ModuleLifecycleRegistry,
  defaultModuleLifecycleRegistry,

  ModuleLifecycleManager,
  createModuleLifecycleManager,

  enterpriseModuleLifecycleMiddleware,

  EnterpriseModuleLifecycleError,
  ModuleRegistrationError,
  ModuleLifecycleTransitionError,
  ModuleNotFoundError,
};
