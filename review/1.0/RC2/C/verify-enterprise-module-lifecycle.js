const {
  ModuleLifecycleState,
  ModuleLifecycleTransition,
  ModuleLifecycleRegistry,
  ModuleLifecycleManager,
  createModuleLifecycleManager,
  enterpriseModuleLifecycleMiddleware,
  ModuleRegistrationError,
  ModuleLifecycleTransitionError,
  ModuleNotFoundError,
} = require('../../../../src/enterprise/lifecycle');

const core = require('../../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const events = [];
  const registry = new ModuleLifecycleRegistry();

  const manager = createModuleLifecycleManager({
    registry,
    container: { name: 'test.container' },
    compositionRoot: { name: 'test.composition' },
  });

  assert(manager instanceof ModuleLifecycleManager, 'manager factory invalid');

  const registered = manager.register({
    name: 'verification.module',
    metadata: { type: 'verification' },
    initialize(context) {
      events.push(`initialize:${context.moduleName}`);
    },
    start(context) {
      events.push(`start:${context.moduleName}`);
    },
    stop(context) {
      events.push(`stop:${context.moduleName}`);
    },
    dispose(context) {
      events.push(`dispose:${context.moduleName}`);
    },
  });

  assert(registered.state === ModuleLifecycleState.REGISTERED, 'initial state invalid');
  assert(manager.get('verification.module').name === 'verification.module', 'registered module not found');

  const initialized = await manager.initialize('verification.module');
  assert(initialized.state === ModuleLifecycleState.INITIALIZED, 'initialize transition failed');

  const started = await manager.start('verification.module');
  assert(started.state === ModuleLifecycleState.STARTED, 'start transition failed');

  const stopped = await manager.stop('verification.module');
  assert(stopped.state === ModuleLifecycleState.STOPPED, 'stop transition failed');

  const restarted = await manager.start('verification.module');
  assert(restarted.state === ModuleLifecycleState.STARTED, 'restart transition failed');

  await manager.stop('verification.module');

  const disposed = await manager.dispose('verification.module');
  assert(disposed.state === ModuleLifecycleState.DISPOSED, 'dispose transition failed');

  assert(events.includes('initialize:verification.module'), 'initialize hook not called');
  assert(events.includes('start:verification.module'), 'start hook not called');
  assert(events.includes('stop:verification.module'), 'stop hook not called');
  assert(events.includes('dispose:verification.module'), 'dispose hook not called');

  try {
    await manager.start('verification.module');
    throw new Error('disposed module should not start');
  } catch (error) {
    assert(error instanceof ModuleLifecycleTransitionError, 'wrong disposed transition error');
  }

  try {
    manager.register({ name: 'verification.module' });
    throw new Error('duplicate module registration should fail');
  } catch (error) {
    assert(error instanceof ModuleRegistrationError, 'wrong duplicate registration error');
  }

  try {
    manager.get('missing.module');
    throw new Error('missing module lookup should fail');
  } catch (error) {
    assert(error instanceof ModuleNotFoundError, 'wrong missing module error');
  }

  assert(ModuleLifecycleTransition.START === 'start', 'transition enum invalid');
  assert(typeof enterpriseModuleLifecycleMiddleware === 'function', 'lifecycle middleware not exported');

  assert(core.lifecycle, 'lifecycle not exported from core');
  assert(typeof core.lifecycle.createModuleLifecycleManager === 'function', 'core lifecycle export invalid');

  console.log('✅ Enterprise Module Lifecycle Manager verification passed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
