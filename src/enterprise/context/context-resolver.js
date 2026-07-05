// src/enterprise/context/context-resolver.js

const { createEnterpriseContext } = require('./enterprise-context');

function resolveTenant(req) {
  return (
    req.tenant ||
    req.enterpriseTenant ||
    {
      id: req.headers['x-tenant-id'] || 'default',
      slug: req.headers['x-tenant-slug'] || 'default',
      name: req.headers['x-tenant-name'] || 'Default Tenant',
      status: 'active',
    }
  );
}

function resolveIdentity(req) {
  return (
    req.identity ||
    req.user ||
    {
      userId: req.headers['x-user-id'] || 'system',
      email: req.headers['x-user-email'],
      displayName: req.headers['x-user-name'],
      provider: req.authProvider || 'system',
    }
  );
}

function resolveAuth(req) {
  return (
    req.auth ||
    {
      authenticated: Boolean(req.user || req.identity || req.headers.authorization),
      provider: req.authProvider || 'system',
      tokenType: req.headers.authorization ? 'bearer' : 'none',
    }
  );
}

function resolveRbac(req) {
  return (
    req.rbac ||
    {
      roles: req.roles || [],
      permissions: req.permissions || [],
    }
  );
}

function resolveFlags(req) {
  return req.featureFlags || {};
}

function resolveEnterpriseContext(req) {
  return createEnterpriseContext({
    tenant: resolveTenant(req),
    identity: resolveIdentity(req),
    auth: resolveAuth(req),
    rbac: resolveRbac(req),
    flags: resolveFlags(req),
    requestId: req.headers['x-request-id'],
    correlationId: req.headers['x-correlation-id'],
    metadata: {
      ip: req.ip,
      method: req.method,
      path: req.originalUrl || req.url,
      userAgent: req.headers['user-agent'],
    },
  });
}

module.exports = {
  resolveEnterpriseContext,
};