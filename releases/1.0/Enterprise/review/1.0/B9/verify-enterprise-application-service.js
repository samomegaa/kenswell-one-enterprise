const {
  ApplicationService,
  ApplicationUseCase,
  ApplicationServiceRegistry,
  defaultApplicationServiceRegistry,
  applicationSuccess,
  applicationFailure,
  enterpriseApplicationMiddleware,
  ApplicationServiceNotFoundError,
} = require('../../../src/enterprise/application');

const {
  DomainService,
  defaultDomainServiceRegistry,
  domainSuccess,
} = require('../../../src/enterprise/domain');

const core = require('../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  defaultApplicationServiceRegistry.clear();
  defaultDomainServiceRegistry.clear();

  const domainService = new DomainService('customer.domain', {
    description: 'Customer domain service',
  });

  domainService.registerOperation('createCustomer', async (context) => {
    return domainSuccess({
      id: 'customer_001',
      name: context.input.name,
      tenantId: context.enterpriseContext.tenant.id,
    });
  });

  defaultDomainServiceRegistry.register(domainService);

  const appService = new ApplicationService('customer.application', {
    description: 'Customer application service',
    version: '1.0.0',
  });

  appService.registerUseCase('onboardCustomer', async (context) => {
    const result = await context.domainServices.execute(
      'customer.domain',
      'createCustomer',
      {
        enterpriseContext: context.enterpriseContext,
        input: context.input,
      }
    );

    if (!result.ok) {
      return result;
    }

    return applicationSuccess({
      customer: result.data,
      useCase: 'onboardCustomer',
    });
  });

  appService.registerUseCase(
    'customUseCase',
    new ApplicationUseCase('customUseCase', async () => applicationSuccess({ custom: true }))
  );

  assert(appService.name === 'customer.application', 'application service name mismatch');
  assert(appService.hasUseCase('onboardCustomer'), 'use case not registered');
  assert(appService.listUseCases().length === 2, 'use case count mismatch');

  const context = {
    enterpriseContext: {
      tenant: {
        id: 'tenant_application',
      },
    },
    domainServices: defaultDomainServiceRegistry,
    input: {
      name: 'Kenswell Customer',
    },
  };

  const onboardResult = await appService.execute('onboardCustomer', context);

  assert(onboardResult.ok === true, 'application use case did not succeed');
  assert(onboardResult.data.customer.id === 'customer_001', 'customer id mismatch');
  assert(onboardResult.data.customer.tenantId === 'tenant_application', 'tenant context mismatch');

  const customResult = await appService.execute('customUseCase', context);

  assert(customResult.ok === true, 'custom use case failed');
  assert(customResult.data.custom === true, 'custom use case result mismatch');

  appService.registerUseCase('failUseCase', async () => {
    throw new Error('expected application failure');
  });

  const failed = await appService.execute('failUseCase', context);

  assert(failed.ok === false, 'failed use case should return application failure');
  assert(failed.error.name === 'ApplicationUseCaseError', 'wrong failure error type');

  const explicitSuccess = applicationSuccess({ ok: true });
  const explicitFailure = applicationFailure(new Error('explicit failure'));

  assert(explicitSuccess.ok === true, 'applicationSuccess invalid');
  assert(explicitFailure.ok === false, 'applicationFailure invalid');

  const registry = new ApplicationServiceRegistry();

  registry.register(appService);

  assert(registry.has('customer.application'), 'registry did not register application service');
  assert(registry.list().length === 1, 'registry list mismatch');

  const registryResult = await registry.execute('customer.application', 'onboardCustomer', context);

  assert(registryResult.ok === true, 'registry execution failed');

  try {
    registry.get('missing.application');
    throw new Error('missing service should throw');
  } catch (error) {
    assert(error instanceof ApplicationServiceNotFoundError, 'wrong missing service error type');
  }

  defaultApplicationServiceRegistry.register(appService);

  assert(defaultApplicationServiceRegistry.has('customer.application'), 'default registry failed');

  assert(typeof enterpriseApplicationMiddleware === 'function', 'application middleware not exported');
  assert(core.application, 'application not exported from core');
  assert(typeof core.application.ApplicationService === 'function', 'core application export invalid');

  console.log('✅ Enterprise Application Service Layer verification passed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
