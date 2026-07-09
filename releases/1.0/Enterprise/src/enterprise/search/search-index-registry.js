const { SearchIndexStatus } = require('./search-types');

const {
  SearchDocumentError,
  SearchIndexNotFoundError,
} = require('./search-errors');

function freezeIndexRecord(record) {
  return Object.freeze({
    ...record,
    document: Object.freeze({
      ...record.document,
    }),
    metadata: Object.freeze({
      ...(record.metadata || {}),
    }),
  });
}

class SearchIndexRegistry {
  constructor() {
    this.documents = new Map();
  }

  index(document, options = {}) {
    if (!document || typeof document !== 'object') {
      throw new SearchDocumentError('search document is required');
    }

    if (!document.id || typeof document.id !== 'string') {
      throw new SearchDocumentError('search document id is required');
    }

    if (!document.title || typeof document.title !== 'string') {
      throw new SearchDocumentError('search document title is required');
    }

    const record = {
      id: document.id,
      type: document.type,
      title: document.title,
      document,
      status: SearchIndexStatus.INDEXED,
      metadata: {
        ...(document.metadata || {}),
        ...(options.metadata || {}),
      },
      indexedAt: new Date().toISOString(),
      removedAt: null,
      failedAt: null,
      lastError: null,
    };

    this.documents.set(document.id, record);

    return freezeIndexRecord(record);
  }

  has(id) {
    return this.documents.has(id);
  }

  get(id) {
    const record = this.documents.get(id);

    if (!record) {
      throw new SearchIndexNotFoundError('search document not indexed', {
        id,
      });
    }

    return freezeIndexRecord(record);
  }

  remove(id) {
    const record = this.documents.get(id);

    if (!record) {
      throw new SearchIndexNotFoundError('search document not indexed', {
        id,
      });
    }

    record.status = SearchIndexStatus.REMOVED;
    record.removedAt = new Date().toISOString();

    return freezeIndexRecord(record);
  }

  fail(id, error) {
    const record = this.documents.get(id);

    if (!record) {
      throw new SearchIndexNotFoundError('search document not indexed', {
        id,
      });
    }

    record.status = SearchIndexStatus.FAILED;
    record.failedAt = new Date().toISOString();
    record.lastError = error instanceof Error ? error.message : String(error);

    return freezeIndexRecord(record);
  }

  list() {
    return Array.from(this.documents.values()).map(freezeIndexRecord);
  }

  search(query, options = {}) {
    const textQuery = String(query || '').toLowerCase();
    const type = options.type || null;

    return this.list().filter((record) => {
      if (record.status !== SearchIndexStatus.INDEXED) {
        return false;
      }

      if (type && record.type !== type) {
        return false;
      }

      if (!textQuery) {
        return true;
      }

      if (record.document && typeof record.document.text === 'function') {
        return record.document.text().includes(textQuery);
      }

      return `${record.title}`.toLowerCase().includes(textQuery);
    });
  }

  clear() {
    this.documents.clear();
  }
}

const defaultSearchIndexRegistry = new SearchIndexRegistry();

module.exports = {
  SearchIndexRegistry,
  defaultSearchIndexRegistry,
};
