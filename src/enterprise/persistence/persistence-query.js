const { PersistenceValidationError } = require('./persistence-errors');

class PersistenceQuery {
  constructor({ filters = {}, sort = [], limit = null, offset = 0 } = {}) {
    if (!Number.isInteger(offset) || offset < 0) {
      throw new PersistenceValidationError('Query offset must be a non-negative integer');
    }

    if (limit !== null && (!Number.isInteger(limit) || limit < 1)) {
      throw new PersistenceValidationError('Query limit must be null or a positive integer');
    }

    this.filters = Object.freeze({ ...filters });
    this.sort = Object.freeze([...sort]);
    this.limit = limit;
    this.offset = offset;
    Object.freeze(this);
  }

  static from(value = {}) {
    return value instanceof PersistenceQuery ? value : new PersistenceQuery(value);
  }
}

module.exports = { PersistenceQuery };
