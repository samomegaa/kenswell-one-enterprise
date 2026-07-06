const { DomainService } = require('./domain-service');
const { DomainOperation } = require('./domain-operation');

const {
  domainSuccess,
  domainFailure,
} = require('./domain-result');

const {
  DomainServiceRegistry,
  defaultDomainServiceRegistry,
} = require('./domain-service-registry');

const { enterpriseDomainMiddleware } = require('./domain-middleware');

const {
  EnterpriseDomainError,
  DomainServiceError,
  DomainOperationError,
  DomainServiceNotFoundError,
} = require('./domain-errors');

module.exports = {
  DomainService,
  DomainOperation,

  domainSuccess,
  domainFailure,

  DomainServiceRegistry,
  defaultDomainServiceRegistry,

  enterpriseDomainMiddleware,

  EnterpriseDomainError,
  DomainServiceError,
  DomainOperationError,
  DomainServiceNotFoundError,
};
