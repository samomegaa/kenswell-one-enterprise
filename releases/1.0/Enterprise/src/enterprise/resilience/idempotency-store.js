const records = new Map();

function createIdempotencyRecord({
  key,
  requestHash = null,
  status = 'pending',
  result = null,
  metadata = {},
} = {}) {
  return Object.freeze({
    key,
    requestHash,
    status,
    result,
    metadata,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

class MemoryIdempotencyStore {
  has(key) {
    return records.has(key);
  }

  get(key) {
    return records.get(key) || null;
  }

  set(key, record) {
    records.set(key, Object.freeze({
      ...record,
      updatedAt: new Date().toISOString(),
    }));

    return records.get(key);
  }

  reserve(key, metadata = {}) {
    if (this.has(key)) {
      return this.get(key);
    }

    const record = createIdempotencyRecord({
      key,
      status: 'pending',
      metadata,
    });

    records.set(key, record);
    return record;
  }

  complete(key, result) {
    const existing = this.get(key);

    const record = Object.freeze({
      ...(existing || createIdempotencyRecord({ key })),
      status: 'completed',
      result,
      updatedAt: new Date().toISOString(),
    });

    records.set(key, record);
    return record;
  }

  fail(key, error) {
    const existing = this.get(key);

    const record = Object.freeze({
      ...(existing || createIdempotencyRecord({ key })),
      status: 'failed',
      result: {
        error: error?.message || String(error),
      },
      updatedAt: new Date().toISOString(),
    });

    records.set(key, record);
    return record;
  }

  clear() {
    records.clear();
  }

  list() {
    return Array.from(records.values());
  }
}

const defaultIdempotencyStore = new MemoryIdempotencyStore();

module.exports = {
  MemoryIdempotencyStore,
  defaultIdempotencyStore,
  createIdempotencyRecord,
};
