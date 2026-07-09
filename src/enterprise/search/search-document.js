const crypto = require('crypto');

const {
  SearchDocumentError,
} = require('./search-errors');

function createSearchDocumentId() {
  return `search_doc_${crypto.randomUUID()}`;
}

class SearchDocument {
  constructor({
    id = createSearchDocumentId(),
    type,
    title,
    body = '',
    source = {},
    metadata = {},
  } = {}) {
    if (!title || typeof title !== 'string') {
      throw new SearchDocumentError('search document title is required');
    }

    this.id = id;
    this.type = type;
    this.title = title;
    this.body = body;
    this.source = Object.freeze({ ...source });
    this.metadata = Object.freeze({ ...metadata });
    this.createdAt = new Date().toISOString();
  }

  text() {
    return `${this.title} ${this.body}`.toLowerCase();
  }

  describe() {
    return Object.freeze({
      id: this.id,
      type: this.type,
      title: this.title,
      source: this.source,
      metadata: this.metadata,
      createdAt: this.createdAt,
    });
  }
}

module.exports = {
  SearchDocument,
  createSearchDocumentId,
};
