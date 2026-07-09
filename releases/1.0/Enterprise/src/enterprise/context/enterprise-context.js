// src/enterprise/context/enterprise-context.js

const crypto = require('crypto');
const { validateEnterpriseContext } = require('./context-types');
const { InvalidEnterpriseContextError } = require('./context-errors');

function createId(prefix) {
  return `${prefix}_${crypto.randomUUID()}`;
}

function createEnterpriseContext({
  tenant,
  identity,
  auth,
  rbac,
  flags = {},
  metadata = {},
  requestId,
  correlationId,
} = {}) {
  const context = {
    requestId: requestId || createId('req'),
    correlationId: correlationId || createId('corr'),

    tenant: {
      id: tenant?.id,
      slug: tenant?.slug || tenant?.id,
      name: tenant?.name,
      status: tenant?.status || 'active',
    },

    identity: {
      userId: identity?.userId,
      email: identity?.email,
      displayName: identity?.displayName,
      provider: identity?.provider,
    },

    auth: {
      authenticated: Boolean(auth?.authenticated),
      provider: auth?.provider,
      tokenType: auth?.tokenType,
    },

    rbac: {
      roles: Array.isArray(rbac?.roles) ? rbac.roles : [],
      permissions: Array.isArray(rbac?.permissions) ? rbac.permissions : [],
    },

    runtime: {
      environment: process.env.NODE_ENV || 'development',
      release: process.env.KENSWELL_RELEASE || '1.0-B4',
    },

    flags,
    metadata,
  };

  if (!validateEnterpriseContext(context)) {
    throw new InvalidEnterpriseContextError({ context });
  }

  return Object.freeze(context);
}

function getEnterpriseContext(req) {
  return req.enterpriseContext;
}

function requireEnterpriseContext(req) {
  const { MissingEnterpriseContextError } = require('./context-errors');

  if (!req.enterpriseContext) {
    throw new MissingEnterpriseContextError();
  }

  return req.enterpriseContext;
}

module.exports = {
  createEnterpriseContext,
  getEnterpriseContext,
  requireEnterpriseContext,
};