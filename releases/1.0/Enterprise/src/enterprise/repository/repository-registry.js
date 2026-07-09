const {
  RepositoryContractError,
  RepositoryNotFoundError,
} = require('./repository-errors');

function freezeRecord(record) {
  return Object.freeze({
    ...record,
    metadata: Object.freeze({
      ...(record.metadata || {}),
    }),
  });
}

class RepositoryRegistry {
  constructor() {
    this.repositories = new Map();
  }

  register(repository) {
    if (!repository || typeof repository !== 'object') {
      throw new RepositoryContractError('repository instance is required');
    }

    if (!repository.name) {
      throw new RepositoryContractError('repository name is required');
    }

    if (this.repositories.has(repository.name)) {
      throw new RepositoryContractError('repository already registered', {
        repository: repository.name,
      });
    }

    const record = {
      name: repository.name,
      type: repository.type,
      repository,
      metadata: repository.metadata || {},
      registeredAt: new Date().toISOString(),
    };

    this.repositories.set(repository.name, record);

    return freezeRecord(record);
  }

  has(name) {
    return this.repositories.has(name);
  }

  get(name) {
    const record = this.repositories.get(name);

    if (!record) {
      throw new RepositoryNotFoundError(
        'repository not registered',
        { repository: name }
      );
    }

    return record.repository;
  }

  describe(name) {
    const record = this.repositories.get(name);

    if (!record) {
      throw new RepositoryNotFoundError(
        'repository not registered',
        { repository: name }
      );
    }

    return freezeRecord(record);
  }

  list() {
    return Array.from(this.repositories.values()).map(freezeRecord);
  }

  clear() {
    this.repositories.clear();
  }
}

const defaultRepositoryRegistry = new RepositoryRegistry();

module.exports = {
  RepositoryRegistry,
  defaultRepositoryRegistry,
};
