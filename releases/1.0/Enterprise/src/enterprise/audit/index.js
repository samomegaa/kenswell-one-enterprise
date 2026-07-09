const { createAuditContext } = require('./audit-context');

const {
  recordActivity,
  queryActivity,
  findByRequest,
  findByCorrelation,
  findByActor,
  findByEntity,
  clearActivityTrail,
} = require('./activity-trail');

const {
  AuditProvider,
  MemoryAuditProvider,
  defaultAuditProvider,
} = require('./audit-provider');

const { enterpriseAuditMiddleware } = require('./audit-middleware');
const { AuditEvents } = require('./audit-events');

const {
  EnterpriseAuditError,
  InvalidAuditContextError,
  AuditProviderError,
} = require('./audit-errors');

module.exports = {
  createAuditContext,

  recordActivity,
  queryActivity,
  findByRequest,
  findByCorrelation,
  findByActor,
  findByEntity,
  clearActivityTrail,

  AuditProvider,
  MemoryAuditProvider,
  defaultAuditProvider,

  enterpriseAuditMiddleware,
  AuditEvents,

  EnterpriseAuditError,
  InvalidAuditContextError,
  AuditProviderError,
};
