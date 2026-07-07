const { CompositionRegistry } = require('./composition-registry');
const { CompositionRootError } = require('./composition-errors');

function createEnterpriseCompositionRoot({
  name = 'kenswell.enterprise.composition',
  version = '1.0-RC2-A',
  registry = new CompositionRegistry(),
  kernel = null,
  metadata = {},
} = {}) {
  if (!kernel) {
    kernel = require('../../../packages/core/src');
  }

  if (!kernel || typeof kernel !== 'object') {
    throw new CompositionRootError('valid enterprise kernel is required');
  }

  const requiredKernelExports = [
    'runtime',
    'context',
    'audit',
    'workflow',
    'transactions',
    'domain',
    'application',
    'api',
    'policy',
    'cqrs',
    'resilience',
    'observability',
    'logging',
    'security',
  ];

  const missing = requiredKernelExports.filter((exportName) => {
    return !kernel[exportName];
  });

  if (missing.length > 0) {
    throw new CompositionRootError('kernel missing required exports', {
      missing,
    });
  }

  registry.register('kernel', kernel, {
    type: 'enterprise.kernel',
    version,
  });

  registry.register('runtime', kernel.runtime, { type: 'kernel.layer' });
  registry.register('context', kernel.context, { type: 'kernel.layer' });
  registry.register('audit', kernel.audit, { type: 'kernel.layer' });
  registry.register('workflow', kernel.workflow, { type: 'kernel.layer' });
  registry.register('transactions', kernel.transactions, { type: 'kernel.layer' });
  registry.register('domain', kernel.domain, { type: 'kernel.layer' });
  registry.register('application', kernel.application, { type: 'kernel.layer' });
  registry.register('api', kernel.api, { type: 'kernel.layer' });
  registry.register('policy', kernel.policy, { type: 'kernel.layer' });
  registry.register('cqrs', kernel.cqrs, { type: 'kernel.layer' });
  registry.register('resilience', kernel.resilience, { type: 'kernel.layer' });
  registry.register('observability', kernel.observability, { type: 'kernel.layer' });
  registry.register('logging', kernel.logging, { type: 'kernel.layer' });
  registry.register('security', kernel.security, { type: 'kernel.layer' });

  return Object.freeze({
    name,
    version,
    registry,
    kernel,
    metadata,
    createdAt: new Date().toISOString(),

    has(serviceName) {
      return registry.has(serviceName);
    },

    get(serviceName) {
      return registry.get(serviceName);
    },

    listServices() {
      return registry.list();
    },
  });
}

module.exports = {
  createEnterpriseCompositionRoot,
};
