const {
  DomainService,
  DomainOperation,
  DomainServiceRegistry,
  defaultDomainServiceRegistry,
  domainSuccess,
  domainFailure,
  enterpriseDomainMiddleware,
  DomainServiceNotFoundError,
} = require('../../../src/enterprise/domain');

const core = require('../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  defaultDomainServiceRegistry.clear();

  const service = new DomainService('verification.service', {
    description: 'Verification domain service',
    version: '1.0.0',
  });

  service.registerOperation('create', async (context) => {
    return {
      id: 'entity_001',
      tenantId: context.enterpriseContext?.tenant?.id || 'tenant_test',
    };
  });

  service.registerOperation(
    'custom',
    new DomainOperation('custom', async () => domainSuccess({ custom: true }))
  );

  assert(service.name === 'verification.service', 'service name mismatch');
  assert(service.hasOperation('create'), 'operation not registered');
  assert(service.listOperations().length === 2, 'operation count mismatch');

  const createResult = await service.execute('create', {
    enterpriseContext: {
      tenant: {
        id: 'tenant_domain',
      },
    },
  });

  assert(createResult.ok === true, 'domain operation did not succeed');
  assert(createResult.data.id === 'entity_001', 'domain result data mismatch');
  assert(createResult.data.tenantId === 'tenant_domain', 'domain context not passed');

  const customResult = await service.execute('custom');

  assert(customResult.ok === true, 'custom operation failed');
  assert(customResult.data.custom === true, 'custom result mismatch');

  service.registerOperation('fail', async () => {
    throw new Error('expected failure');
  });

  const failed = await service.execute('fail');

  assert(failed.ok === false, 'failed operation should return domain failure');
  assert(failed.error.name === 'DomainOperationError', 'wrong failure error type');

  const explicitSuccess = domainSuccess({ ok: true });
  const explicitFailure = domainFailure(new Error('explicit failure'));

  assert(explicitSuccess.ok === true, 'domainSuccess invalid');
  assert(explicitFailure.ok === false, 'domainFailure invalid');

  const registry = new DomainServiceRegistry();

  registry.register(service);

  assert(registry.has('verification.service'), 'registry did not register service');
  assert(registry.list().length === 1, 'registry list mismatch');

  const registryResult = await registry.execute('verification.service', 'create', {
    enterpriseContext: {
      tenant: {
        id: 'tenant_registry',
      },
    },
  });

  assert(registryResult.ok === true, 'registry execution failed');
  assert(registryResult.data.tenantId === 'tenant_registry', 'registry context not passed');

  try {
    registry.get('missing.service');
    throw new Error('missing service should throw');
  } catch (error) {
    assert(error instanceof DomainServiceNotFoundError, 'wrong missing service error type');
  }

  defaultDomainServiceRegistry.register(service);

  assert(defaultDomainServiceRegistry.has('verification.service'), 'default registry failed');

  assert(typeof enterpriseDomainMiddleware === 'function', 'domain middleware not exported');
  assert(core.domain, 'domain not exported from core');
  assert(typeof core.domain.DomainService === 'function', 'core domain export invalid');

  console.log('✅ Enterprise Domain Service Layer verification passed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
