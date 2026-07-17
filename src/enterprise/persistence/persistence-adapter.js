const { PersistenceQuery } = require('./persistence-query');

class PersistenceAdapter {
  async create() { throw new Error('create() must be implemented'); }
  async update() { throw new Error('update() must be implemented'); }
  async delete() { throw new Error('delete() must be implemented'); }
  async findById() { throw new Error('findById() must be implemented'); }
  async findMany(query = {}) { PersistenceQuery.from(query); throw new Error('findMany() must be implemented'); }
  async count() { throw new Error('count() must be implemented'); }

  async exists(query = {}) {
    return (await this.count(PersistenceQuery.from(query))) > 0;
  }

  async transaction(work) {
    return work(this);
  }
}

module.exports = { PersistenceAdapter };
