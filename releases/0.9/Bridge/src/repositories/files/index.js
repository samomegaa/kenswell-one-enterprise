const models = require('../../database/models');
const FileAssetRepository = require('./FileAssetRepository');

module.exports = {
  fileAssetRepository: new FileAssetRepository(models),
};
