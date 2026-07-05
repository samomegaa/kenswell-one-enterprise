const {
  optional,
  number,
} = require('./validation');

function storageConfig(env = process.env) {
  return {
    provider: optional(env, 'STORAGE_PROVIDER', 'null_storage'),
    bucket: optional(env, 'STORAGE_BUCKET', null),
    region: optional(env, 'STORAGE_REGION', null),
    endpoint: optional(env, 'STORAGE_ENDPOINT', null),
    maxFileSizeBytes: number(env, 'MAX_FILE_SIZE_BYTES', 25 * 1024 * 1024),
  };
}

module.exports = storageConfig;
