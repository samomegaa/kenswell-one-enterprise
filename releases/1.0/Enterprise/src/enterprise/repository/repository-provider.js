const {
  RepositoryRegistry,
} = require('./repository-registry');

class RepositoryProvider {
  constructor({
    registry = new RepositoryRegistry(),
    container = null,
    configuration = null,
    compositionRoot = null,
  } = {}) {
    this.registry = registry;
    this.container = container;
    this.configuration = configuration;
    this.compositionRoot = compositionRoot;
  }

  register(repository) {
    return this.registry.register(repository);
  }

  has(name) {
    return this.registry.has(name);
  }

  get(name) {
    return this.registry.get(name);
  }

  describe(name) {
    return this.registry.describe(name);
  }

  list() {
    return this.registry.list();
  }

  createContext() {
    return Object.freeze({
      container: this.container,
      configuration: this.configuration,
      compositionRoot: this.compositionRoot,
      repositories: this,
      createdAt: new Date().toISOString(),
    });
  }
}

function createRepositoryProvider(options = {}) {
  return new RepositoryProvider(options);
}

module.exports = {
  RepositoryProvider,
  createRepositoryProvider,
};
