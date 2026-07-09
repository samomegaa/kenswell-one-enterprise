const {
  PlatformOperationType,
  PlatformOperationStatus,
  PlatformOperation,
  OperationRegistry,
  PlatformOperationsService,
  createPlatformOperationsService,
  enterpriseOperationsMiddleware,
  PlatformOperationRegistrationError,
  PlatformOperationNotFoundError,
  PlatformOperationExecutionError,
} = require('../../../../src/enterprise/operations');

const core = require('../../../../packages/core/src');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

class HealthOperation extends PlatformOperation {
  constructor() {
    super({
      name: 'platform.health',
      type: PlatformOperationType.HEALTH,
    });
  }

  async execute(context, input) {
    return {
      ok: true,
      operation: context.operationName,
      input,
    };
  }
}

class FailingOperation extends PlatformOperation {
  constructor() {
    super({
      name: 'platform.fail',
      type: PlatformOperationType.DIAGNOSTIC,
    });
  }

  async execute() {
    throw new Error('expected failure');
  }
}

async function run() {
  const registry = new OperationRegistry();

  const service = createPlatformOperationsService({
    registry,
    host: {},
    repositories: {},
    scheduler: {},
    notifications: {},
    search: {},
    integrations: {},
    intelligence: {},
    configuration: {},
    compositionRoot: {},
  });

  assert(service instanceof PlatformOperationsService, 'service factory invalid');

  service.register(new HealthOperation());

  assert(service.has('platform.health'), 'operation registration failed');

  service.makeAvailable('platform.health');

  const result = await service.execute('platform.health', {
    check: 'basic',
  });

  assert(result.ok === true, 'operation execution failed');
  assert(result.type === PlatformOperationType.HEALTH, 'operation type mismatch');
  assert(Object.isFrozen(result), 'operation result must be frozen');

  const snapshot = service.snapshot();

  assert(snapshot.operations === 1, 'snapshot operation count mismatch');
  assert(snapshot.available === 1, 'snapshot available count mismatch');
  assert(snapshot.hostAvailable === true, 'host availability mismatch');

  service.register(new FailingOperation());
  service.makeAvailable('platform.fail');

  try {
    await service.execute('platform.fail');
    throw new Error('failing operation should fail');
  } catch (error) {
    assert(error instanceof PlatformOperationExecutionError, 'wrong failing operation error');
  }

  assert(
    service.get('platform.fail').status === PlatformOperationStatus.FAILED,
    'failed operation status mismatch'
  );

  try {
    service.register(new HealthOperation());
    throw new Error('duplicate operation should fail');
  } catch (error) {
    assert(error instanceof PlatformOperationRegistrationError, 'wrong duplicate operation error');
  }

  try {
    service.get('missing.operation');
    throw new Error('missing operation should fail');
  } catch (error) {
    assert(error instanceof PlatformOperationNotFoundError, 'wrong missing operation error');
  }

  try {
    await new PlatformOperation({
      name: 'base.operation',
      type: PlatformOperationType.RUNTIME,
    }).execute();

    throw new Error('base operation should fail');
  } catch (error) {
    assert(error instanceof PlatformOperationRegistrationError, 'wrong base contract error');
  }

  assert(typeof enterpriseOperationsMiddleware === 'function', 'middleware not exported');

  assert(core.operations, 'operations not exported from core');
  assert(
    typeof core.operations.createPlatformOperationsService === 'function',
    'core operations export invalid'
  );

  console.log('✅ Enterprise Platform Operations verification passed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
