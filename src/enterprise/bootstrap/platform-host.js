const { PlatformBootstrapState } = require('./bootstrap-state');
const { PlatformBootstrapError } = require('./bootstrap-errors');
const { createBootstrapContext } = require('./bootstrap-context');

class EnterpriseHost {
  constructor({
    compositionRoot,
    container,
    lifecycle,
    configuration,
    plugins,
    metadata = {},
  } = {}) {
    this.compositionRoot = compositionRoot;
    this.container = container;
    this.lifecycle = lifecycle;
    this.configuration = configuration;
    this.plugins = plugins;
    this.metadata = Object.freeze({ ...metadata });
    this.state = PlatformBootstrapState.CREATED;
    this.createdAt = new Date().toISOString();
    this.startedAt = null;
    this.stoppedAt = null;
    this.disposedAt = null;
  }

  context() {
    return createBootstrapContext({
      compositionRoot: this.compositionRoot,
      container: this.container,
      lifecycle: this.lifecycle,
      configuration: this.configuration,
      plugins: this.plugins,
    });
  }

  configure() {
    if (this.state !== PlatformBootstrapState.CREATED) {
      throw new PlatformBootstrapError('host cannot be configured from current state', {
        state: this.state,
      });
    }

    if (this.configuration && typeof this.configuration.validate === 'function') {
      this.configuration.validate();
    }

    this.state = PlatformBootstrapState.CONFIGURED;
    return this.snapshot();
  }

  compose() {
    if (this.state !== PlatformBootstrapState.CONFIGURED) {
      throw new PlatformBootstrapError('host cannot be composed from current state', {
        state: this.state,
      });
    }

    this.state = PlatformBootstrapState.COMPOSED;
    return this.snapshot();
  }

  async initialize() {
    if (this.state !== PlatformBootstrapState.COMPOSED) {
      throw new PlatformBootstrapError('host cannot be initialized from current state', {
        state: this.state,
      });
    }

    if (this.lifecycle && typeof this.lifecycle.initializeAll === 'function') {
      await this.lifecycle.initializeAll();
    }

    this.state = PlatformBootstrapState.INITIALIZED;
    return this.snapshot();
  }

  async start() {
    if (this.state !== PlatformBootstrapState.INITIALIZED) {
      throw new PlatformBootstrapError('host cannot be started from current state', {
        state: this.state,
      });
    }

    if (this.lifecycle && typeof this.lifecycle.startAll === 'function') {
      await this.lifecycle.startAll();
    }

    this.state = PlatformBootstrapState.STARTED;
    this.startedAt = new Date().toISOString();

    return this.snapshot();
  }

  async stop() {
    if (this.state !== PlatformBootstrapState.STARTED) {
      throw new PlatformBootstrapError('host cannot be stopped from current state', {
        state: this.state,
      });
    }

    if (this.lifecycle && typeof this.lifecycle.stopAll === 'function') {
      await this.lifecycle.stopAll();
    }

    this.state = PlatformBootstrapState.STOPPED;
    this.stoppedAt = new Date().toISOString();

    return this.snapshot();
  }

  async dispose() {
    if (this.state === PlatformBootstrapState.DISPOSED) {
      throw new PlatformBootstrapError('host already disposed', {
        state: this.state,
      });
    }

    if (this.state === PlatformBootstrapState.STARTED) {
      await this.stop();
    }

    if (this.lifecycle && typeof this.lifecycle.disposeAll === 'function') {
      await this.lifecycle.disposeAll();
    }

    this.state = PlatformBootstrapState.DISPOSED;
    this.disposedAt = new Date().toISOString();

    return this.snapshot();
  }

  snapshot() {
    return Object.freeze({
      state: this.state,
      metadata: this.metadata,
      createdAt: this.createdAt,
      startedAt: this.startedAt,
      stoppedAt: this.stoppedAt,
      disposedAt: this.disposedAt,
    });
  }
}

function createEnterpriseHost(options = {}) {
  return new EnterpriseHost(options);
}

module.exports = {
  EnterpriseHost,
  createEnterpriseHost,
};
