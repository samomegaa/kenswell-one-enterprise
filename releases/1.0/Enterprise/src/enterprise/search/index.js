const {
  SearchDocumentType,
  SearchIndexStatus,
} = require('./search-types');

const {
  SearchDocument,
  createSearchDocumentId,
} = require('./search-document');

const {
  SearchIndexRegistry,
  defaultSearchIndexRegistry,
} = require('./search-index-registry');

const {
  SearchProvider,
  createSearchProvider,
} = require('./search-provider');

const { enterpriseSearchMiddleware } = require('./search-middleware');

const {
  EnterpriseSearchError,
  SearchDocumentError,
  SearchIndexNotFoundError,
  SearchExecutionError,
} = require('./search-errors');

module.exports = {
  SearchDocumentType,
  SearchIndexStatus,

  SearchDocument,
  createSearchDocumentId,

  SearchIndexRegistry,
  defaultSearchIndexRegistry,

  SearchProvider,
  createSearchProvider,

  enterpriseSearchMiddleware,

  EnterpriseSearchError,
  SearchDocumentError,
  SearchIndexNotFoundError,
  SearchExecutionError,
};
