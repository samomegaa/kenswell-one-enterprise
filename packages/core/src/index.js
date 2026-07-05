module.exports = {
  moduleRegistry: require('./module-registry'),
  featureFlags: require('./feature-flags'),
  events: require('./events'),
  runtime: require('./runtime'),
  tenant: require('./tenant'),
  organisation: require('./organisation'),
  identity: require('./identity'),
  auth: require('./auth'),
  rbac: require('./rbac'),
  context: require('../../../src/enterprise/context'),
};
