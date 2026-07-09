const { RepositoryContractError } = require('./repository-errors');

class EnterpriseRepository {
  constructor({
    name,
    type,
    metadata = {},
  } = {}) {
    if (!name || typeof name !== 'string') {
      throw new RepositoryContractError('repository name is required');
    }

    this.name = name;
    this.type = type;
    this.metadata = Object.freeze({ ...metadata });
  }

  async findById() {
    throw new RepositoryContractError('findById must be implemented', {
      repository: this.name,
    });
  }

  async findMany() {
    throw new RepositoryContractError('findMany must be implemented', {
      repository: this.name,
    });
  }

  async save() {
    throw new RepositoryContractError('save must be implemented', {
      repository: this.name,
    });
  }

  async delete() {
    throw new RepositoryContractError('delete must be implemented', {
      repository: this.name,
    });
  }

  async exists(id) {
    const record = await this.findById(id);
    return Boolean(record);
  }

  describe() {
    return Object.freeze({
      name: this.name,
      type: this.type,
      metadata: this.metadata,
    });
  }
}

module.exports = {
  EnterpriseRepository,
};
