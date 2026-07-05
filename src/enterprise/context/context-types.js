// src/enterprise/context/context-types.js

/**
 * EnterpriseContext shape:
 *
 * {
 *   requestId: string,
 *   correlationId: string,
 *   tenant: {
 *     id: string,
 *     slug: string,
 *     name?: string,
 *     status?: string
 *   },
 *   identity: {
 *     userId: string,
 *     email?: string,
 *     displayName?: string,
 *     provider?: string
 *   },
 *   auth: {
 *     authenticated: boolean,
 *     provider?: string,
 *     tokenType?: string
 *   },
 *   rbac: {
 *     roles: string[],
 *     permissions: string[]
 *   },
 *   runtime: {
 *     environment: string,
 *     release: string
 *   },
 *   flags: object,
 *   metadata: object
 * }
 */

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateEnterpriseContext(context) {
  if (!context || typeof context !== 'object') return false;
  if (!isNonEmptyString(context.requestId)) return false;
  if (!isNonEmptyString(context.correlationId)) return false;
  if (!context.tenant || !isNonEmptyString(context.tenant.id)) return false;
  if (!context.identity || !isNonEmptyString(context.identity.userId)) return false;
  if (!context.auth || typeof context.auth.authenticated !== 'boolean') return false;
  if (!context.rbac || !Array.isArray(context.rbac.roles) || !Array.isArray(context.rbac.permissions)) return false;
  if (!context.runtime || !isNonEmptyString(context.runtime.environment)) return false;

  return true;
}

module.exports = {
  validateEnterpriseContext,
};