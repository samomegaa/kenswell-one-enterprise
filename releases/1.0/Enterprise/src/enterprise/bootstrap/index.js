const { PlatformBootstrapState } = require('./bootstrap-state');

const {
  EnterpriseBootstrapError,
  PlatformBootstrapError,
} = require('./bootstrap-errors');

const { createBootstrapContext } = require('./bootstrap-context');

const {
  EnterpriseHost,
  createEnterpriseHost,
} = require('./platform-host');

const { createPlatformBootstrap } = require('./platform-bootstrap');

const { enterpriseBootstrapMiddleware } = require('./bootstrap-middleware');

module.exports = {
  PlatformBootstrapState,

  EnterpriseBootstrapError,
  PlatformBootstrapError,

  createBootstrapContext,

  EnterpriseHost,
  createEnterpriseHost,

  createPlatformBootstrap,

  enterpriseBootstrapMiddleware,
};
