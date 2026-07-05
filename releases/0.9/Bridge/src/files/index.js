const FileUploadService = require('./FileUploadService');

module.exports = {
  fileUploadService: new FileUploadService(),
  NullStorageProvider: require('./providers/NullStorageProvider'),
  ...require('./file.constants'),
};
