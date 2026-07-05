const FILE_STATUS = Object.freeze({
  PENDING_UPLOAD: 'pending_upload',
  UPLOADED: 'uploaded',
  FAILED: 'failed',
  DELETED: 'deleted',
});

const FILE_VISIBILITY = Object.freeze({
  PRIVATE: 'private',
  CLIENT_VISIBLE: 'client_visible',
  INTERNAL_ONLY: 'internal_only',
});

const ALLOWED_FILE_MIME_TYPES = Object.freeze([
  'application/pdf',
  'image/png',
  'image/jpeg',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;

module.exports = {
  FILE_STATUS,
  FILE_VISIBILITY,
  ALLOWED_FILE_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
};
