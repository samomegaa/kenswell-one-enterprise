const {
  PlatformBootstrapState,
  EnterpriseHost,
  createPlatformBootstrap,
  enterpriseBootstrapMiddleware,
  PlatformBootstrapError,
} = require('../../../../src/enterprise/bootstrap');

const core = require('../../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const platform = createPlatformBootstrap({
    name: 'kenswell.enterprise.test',
    version: '1.0-RC2-F',
    metadata: {
      release: 'RC2-F',
    },
  });

  assert(Object.isFrozen(platform), 'platform bootstrap must be immutable');
  assert(platform.name === 'kenswell.enterprise.test', 'platform name mismatch');
  assert(platform.version === '1.0-RC2-F', 'platform version mismatch');

  assert(platform.host instanceof EnterpriseHost, 'enterprise host invalid');
  assert(platform.snapshot().state === PlatformBootstrapState.CREATED, 'initial host state invalid');

  assert(platform.compositionRoot, 'composition root missing');
  assert(platform.container, 'container missing');
  assert(platform.lifecycle, 'lifecycle missing');
  assert(platform.configuration, 'configuration missing');
  assert(platform.plugins, 'plugins missing');

  assert(platform.container.resolve('configuration') === platform.configuration, 'configuration not registered in container');
  assert(platform.container.resolve('compositionRoot') === platform.compositionRoot, 'composition root not registered in container');
  assert(platform.container.resolve('lifecycle') === platform.lifecycle, 'lifecycle not registered in container');
  assert(platform.container.resolve('plugins') === platform.plugins, 'plugins not registered in container');

  const startSnapshot = await platform.start();

  assert(startSnapshot.state === PlatformBootstrapState.STARTED, 'platform did not start');
  assert(platform.snapshot().startedAt, 'platform startedAt missing');

  try {
    await platform.start();
    throw new Error('second start should fail');
  } catch (error) {
    assert(error instanceof PlatformBootstrapError, 'wrong second start error');
  }

  const stopSnapshot = await platform.stop();

  assert(stopSnapshot.state === PlatformBootstrapState.STOPPED, 'platform did not stop');
  assert(platform.snapshot().stoppedAt, 'platform stoppedAt missing');

  const disposeSnapshot = await platform.dispose();

  assert(disposeSnapshot.state === PlatformBootstrapState.DISPOSED, 'platform did not dispose');
  assert(platform.snapshot().disposedAt, 'platform disposedAt missing');

  assert(typeof enterpriseBootstrapMiddleware === 'function', 'bootstrap middleware not exported');

  assert(core.bootstrap, 'bootstrap not exported from core');
  assert(typeof core.bootstrap.createPlatformBootstrap === 'function', 'core bootstrap export invalid');

  console.log('✅ Enterprise Platform Bootstrap verification passed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
