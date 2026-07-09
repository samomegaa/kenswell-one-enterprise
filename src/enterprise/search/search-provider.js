const {
  SearchIndexRegistry,
} = require('./search-index-registry');

const {
  SearchExecutionError,
} = require('./search-errors');

class SearchProvider {
  constructor({
    registry = new SearchIndexRegistry(),
    repositories = null,
    scheduler = null,
    notifications = null,
    configuration = null,
    compositionRoot = null,
  } = {}) {
    this.registry = registry;
    this.repositories = repositories;
    this.scheduler = scheduler;
    this.notifications = notifications;
    this.configuration = configuration;
    this.compositionRoot = compositionRoot;
  }

  index(document, options = {}) {
    return this.registry.index(document, options);
  }

  has(id) {
    return this.registry.has(id);
  }

  get(id) {
    return this.registry.get(id);
  }

  remove(id) {
    return this.registry.remove(id);
  }

  list() {
    return this.registry.list();
  }

  search(query, options = {}) {
    try {
      const results = this.registry.search(query, options);

      return Object.freeze({
        ok: true,
        query,
        count: results.length,
        results,
      });
    } catch (error) {
      throw new SearchExecutionError('search execution failed', {
        query,
        error: error.message,
      });
    }
  }

  createContext() {
    return Object.freeze({
      repositories: this.repositories,
      scheduler: this.scheduler,
      notifications: this.notifications,
      configuration: this.configuration,
      compositionRoot: this.compositionRoot,
      createdAt: new Date().toISOString(),
    });
  }
}

function createSearchProvider(options = {}) {
  return new SearchProvider(options);
}

module.exports = {
  SearchProvider,
  createSearchProvider,
};
