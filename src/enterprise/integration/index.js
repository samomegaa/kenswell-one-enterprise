const {
  IntegrationProtocol,
  IntegrationStatus,
} = require('./integration-types');

const { EnterpriseIntegrationConnector } = require('./integration-connector');

const {
  IntegrationRegistry,
  defaultIntegrationRegistry,
} = require('./integration-registry');

const {
  IntegrationProvider,
  createIntegrationProvider,
} = require('./integration-provider');

const { enterpriseIntegrationMiddleware } = require('./integration-middleware');

const {
  EnterpriseIntegrationError,
  IntegrationRegistrationError,
  IntegrationNotFoundError,
  IntegrationExecutionError,
} = require('./integration-errors');

module.exports = {
  IntegrationProtocol,
  IntegrationStatus,

  EnterpriseIntegrationConnector,

  IntegrationRegistry,
  defaultIntegrationRegistry,

  IntegrationProvider,
  createIntegrationProvider,

  enterpriseIntegrationMiddleware,

  EnterpriseIntegrationError,
  IntegrationRegistrationError,
  IntegrationNotFoundError,
  IntegrationExecutionError,
};
