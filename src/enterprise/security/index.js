const {
  DEFAULT_SECURITY_HEADERS,
  createSecurityHeaders,
  applySecurityHeaders,
} = require('./security-headers');

const { RuntimeGuard } = require('./runtime-guard');
const { RequestGuard } = require('./request-guard');

const {
  allowSecurity,
  denySecurity,
} = require('./security-decision');

const { enterpriseSecurityMiddleware } = require('./security-middleware');

const {
  EnterpriseSecurityError,
  SecurityHeaderError,
  RuntimeGuardError,
  RequestGuardError,
} = require('./security-errors');

module.exports = {
  DEFAULT_SECURITY_HEADERS,
  createSecurityHeaders,
  applySecurityHeaders,

  RuntimeGuard,
  RequestGuard,

  allowSecurity,
  denySecurity,

  enterpriseSecurityMiddleware,

  EnterpriseSecurityError,
  SecurityHeaderError,
  RuntimeGuardError,
  RequestGuardError,
};
