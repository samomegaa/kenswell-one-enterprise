const {
  ConfigurationProvider,
  createConfigurationProvider,
} = require('./configuration-provider');

const {
  ConfigurationRegistry,
  defaultConfigurationRegistry,
} = require('./configuration-registry');

const {
  ConfigurationSchema,
  createConfigurationSchema,
} = require('./configuration-schema');

const { ConfigurationSource } = require('./configuration-sources');

const { enterpriseConfigurationMiddleware } = require('./configuration-middleware');

const {
  EnterpriseConfigurationError,
  ConfigurationNotFoundError,
  ConfigurationValidationError,
} = require('./configuration-errors');

module.exports = {
  ConfigurationProvider,
  createConfigurationProvider,

  ConfigurationRegistry,
  defaultConfigurationRegistry,

  ConfigurationSchema,
  createConfigurationSchema,

  ConfigurationSource,

  enterpriseConfigurationMiddleware,

  EnterpriseConfigurationError,
  ConfigurationNotFoundError,
  ConfigurationValidationError,
};
