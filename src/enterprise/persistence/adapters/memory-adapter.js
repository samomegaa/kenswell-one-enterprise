const { PersistenceAdapter } = require('../persistence-adapter');
const { PersistenceQuery } = require('../persistence-query');
const { PersistenceResult } = require('../persistence-result');
const { PersistenceConflictError, PersistenceNotFoundError, PersistenceVersionError } = require('../persistence-errors');

class MemoryPersistenceAdapter extends PersistenceAdapter {
  constructor({ records = [], idField = 'id' } = {}) {
    super();
    this.idField = idField;
    this.records = new Map(records.map((record) => [record[idField], Object.freeze({ ...record })]));
  }

  async create(entity) {
    const id = entity[this.idField];
    if (this.records.has(id)) throw new PersistenceConflictError('Entity already exists', { id });
    const record = Object.freeze({ ...entity });
    this.records.set(id, record);
    return record;
  }

  async update(entity, { expectedVersion = null } = {}) {
    const id = entity[this.idField];
    const current = this.records.get(id);
    if (!current) throw new PersistenceNotFoundError(id);
    if (expectedVersion !== null && current.version !== expectedVersion) {
      throw new PersistenceVersionError('Entity version mismatch', { id, expectedVersion, actualVersion: current.version });
    }
    const record = Object.freeze({ ...entity });
    this.records.set(id, record);
    return record;
  }

  async delete(id) {
    const current = this.records.get(id);
    if (!current) throw new PersistenceNotFoundError(id);
    this.records.delete(id);
    return current;
  }

  async findById(id) { return this.records.get(id) || null; }

  async findMany(query = {}) {
    const started = Date.now();
    const normalized = PersistenceQuery.from(query);
    let items = [...this.records.values()].filter((record) => Object.entries(normalized.filters).every(([key, value]) => record[key] === value));
    for (const rule of [...normalized.sort].reverse()) {
      const [field, direction = 'asc'] = String(rule).split(':');
      items.sort((a, b) => (a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0) * (direction === 'desc' ? -1 : 1));
    }
    const count = items.length;
    items = items.slice(normalized.offset, normalized.limit === null ? undefined : normalized.offset + normalized.limit);
    return new PersistenceResult({ items, count, offset: normalized.offset, limit: normalized.limit, duration: Date.now() - started });
  }

  async count(query = {}) { return (await this.findMany(query)).count; }
}

module.exports = { MemoryPersistenceAdapter };
