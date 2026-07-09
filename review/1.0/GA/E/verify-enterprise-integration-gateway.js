const {
  IntegrationProtocol,
  IntegrationStatus,
  EnterpriseIntegrationConnector,
  IntegrationRegistry,
  IntegrationProvider,
  createIntegrationProvider,
  enterpriseIntegrationMiddleware,
  IntegrationRegistrationError,
  IntegrationNotFoundError,
  IntegrationExecutionError,
} = require('../../../../src/enterprise/integration');

const core = require('../../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

class RestConnector extends EnterpriseIntegrationConnector {
  constructor() {
    super({
      name: 'verification.rest',
      protocol: IntegrationProtocol.REST,
      metadata: {
        purpose: 'integration verification',
      },
    });
  }

  async execute(context, request) {
    return {
      integrationName: context.integrationName,
      protocol: context.protocol,
      method: request.method,
      path: request.path,
      ok: true,
    };
  }
}

class FailingConnector extends EnterpriseIntegrationConnector {
  constructor() {
    super({
      name: 'failing.rest',
      protocol: IntegrationProtocol.REST,
    });
  }

  async execute() {
    throw new Error('expected integration failure');
  }
}

async function run() {
  const registry = new IntegrationRegistry();

  const provider = createIntegrationProvider({
    registry,
    scheduler: { name: 'test.scheduler' },
    repositories: { name: 'test.repositories' },
    notifications: { name: 'test.notifications' },
    search: { name: 'test.search' },
    configuration: { name: 'test.configuration' },
    compositionRoot: { name: 'test.composition' },
  });

  assert(provider instanceof IntegrationProvider, 'provider factory invalid');

  const connector = new RestConnector();
  const registered = provider.register(connector);

  assert(registered.name === 'verification.rest', 'integration registration name mismatch');
  assert(registered.protocol === IntegrationProtocol.REST, 'integration protocol mismatch');
  assert(registered.status === IntegrationStatus.REGISTERED, 'integration initial status invalid');
  assert(Object.isFrozen(registered), 'integration registration record should be frozen');

  assert(provider.has('verification.rest') === true, 'provider has failed');
  assert(provider.get('verification.rest').name === 'verification.rest', 'provider get failed');
  assert(provider.list().length === 1, 'provider list count mismatch');

  const connected = provider.connect('verification.rest');

  assert(connected.status === IntegrationStatus.CONNECTED, 'integration connect failed');

  const result = await provider.execute('verification.rest', {
    method: 'GET',
    path: '/health',
  });

  assert(result.ok === true, 'integration execution result not ok');
  assert(result.integration === 'verification.rest', 'integration result name mismatch');
  assert(result.protocol === IntegrationProtocol.REST, 'integration result protocol mismatch');
  assert(result.result.method === 'GET', 'integration request method mismatch');
  assert(result.result.path === '/health', 'integration request path mismatch');
  assert(Object.isFrozen(result), 'integration result should be frozen');

  const disconnected = provider.disconnect('verification.rest');

  assert(disconnected.status === IntegrationStatus.DISCONNECTED, 'integration disconnect failed');

  try {
    await provider.execute('verification.rest', {});
    throw new Error('disconnected integration should not execute');
  } catch (error) {
    assert(error instanceof IntegrationExecutionError, 'wrong disconnected execution error');
  }

  provider.register(new FailingConnector());
  provider.connect('failing.rest');

  try {
    await provider.execute('failing.rest', {});
    throw new Error('failing connector should throw');
  } catch (error) {
    assert(error instanceof IntegrationExecutionError, 'wrong failing connector error');
  }

  assert(provider.get('failing.rest').status === IntegrationStatus.FAILED, 'failing connector status mismatch');

  try {
    provider.register(new RestConnector());
    throw new Error('duplicate integration should fail');
  } catch (error) {
    assert(error instanceof IntegrationRegistrationError, 'wrong duplicate integration error');
  }

  try {
    provider.get('missing.integration');
    throw new Error('missing integration should fail');
  } catch (error) {
    assert(error instanceof IntegrationNotFoundError, 'wrong missing integration error');
  }

  try {
    await new EnterpriseIntegrationConnector({
      name: 'base.integration',
      protocol: IntegrationProtocol.REST,
    }).execute();

    throw new Error('base connector should fail');
  } catch (error) {
    assert(error instanceof IntegrationRegistrationError, 'wrong base connector contract error');
  }

  assert(typeof enterpriseIntegrationMiddleware === 'function', 'integration middleware not exported');

  assert(core.integration, 'integration not exported from core');
  assert(typeof core.integration.createIntegrationProvider === 'function', 'core integration export invalid');

  console.log('✅ Enterprise Integration Gateway verification passed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
