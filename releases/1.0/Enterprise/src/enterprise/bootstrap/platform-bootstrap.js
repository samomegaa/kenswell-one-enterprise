const { createEnterpriseCompositionRoot } = require('../composition');
const { createEnterpriseContainer } = require('../di');
const { createModuleLifecycleManager } = require('../lifecycle');
const { createConfigurationProvider } = require('../configuration');
const { createPluginManager } = require('../plugins');
const { createEnterpriseHost } = require('./platform-host');

function createPlatformBootstrap({
  name = 'kenswell.enterprise.platform',
  version = '1.0-RC2-F',
  metadata = {},
  configuration = null,
  compositionRoot = null,
  container = null,
  lifecycle = null,
  plugins = null,
} = {}) {
  const resolvedConfiguration = configuration || createConfigurationProvider();

  const resolvedCompositionRoot = compositionRoot || createEnterpriseCompositionRoot({
    name,
    version,
    metadata,
  });

  const resolvedContainer = container || createEnterpriseContainer();

  resolvedContainer.registerValue('configuration', resolvedConfiguration, {
    type: 'platform.configuration',
  });

  resolvedContainer.registerValue('compositionRoot', resolvedCompositionRoot, {
    type: 'platform.composition',
  });

  const resolvedLifecycle = lifecycle || createModuleLifecycleManager({
    container: resolvedContainer,
    compositionRoot: resolvedCompositionRoot,
  });

  resolvedContainer.registerValue('lifecycle', resolvedLifecycle, {
    type: 'platform.lifecycle',
  });

  const resolvedPlugins = plugins || createPluginManager({
    container: resolvedContainer,
    configuration: resolvedConfiguration,
    lifecycle: resolvedLifecycle,
    compositionRoot: resolvedCompositionRoot,
  });

  resolvedContainer.registerValue('plugins', resolvedPlugins, {
    type: 'platform.plugins',
  });

  const host = createEnterpriseHost({
    compositionRoot: resolvedCompositionRoot,
    container: resolvedContainer,
    lifecycle: resolvedLifecycle,
    configuration: resolvedConfiguration,
    plugins: resolvedPlugins,
    metadata,
  });

  return Object.freeze({
    name,
    version,
    host,
    compositionRoot: resolvedCompositionRoot,
    container: resolvedContainer,
    lifecycle: resolvedLifecycle,
    configuration: resolvedConfiguration,
    plugins: resolvedPlugins,
    createdAt: new Date().toISOString(),

    async start() {
      host.configure();
      host.compose();
      await host.initialize();
      return host.start();
    },

    async stop() {
      return host.stop();
    },

    async dispose() {
      return host.dispose();
    },

    snapshot() {
      return host.snapshot();
    },
  });
}

module.exports = {
  createPlatformBootstrap,
};
