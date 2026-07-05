const { Sequelize, DataTypes } = require('sequelize');

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required');
}

const sequelize = new Sequelize(databaseUrl, {
  logging: process.env.SEQUELIZE_LOGGING === 'true' ? console.log : false,
});

const Client = require('./Client')(sequelize, DataTypes);
const PortalAccount = require('./PortalAccount')(sequelize, DataTypes);
const PortalMatter = require('./PortalMatter')(sequelize, DataTypes);
const PortalDocument = require('./PortalDocument')(sequelize, DataTypes);
const PortalMessage = require('./PortalMessage')(sequelize, DataTypes);
const AuditLog = require('./AuditLog')(sequelize, DataTypes);
const Notification = require('./Notification')(sequelize, DataTypes);
const FileAsset = require('./FileAsset')(sequelize, DataTypes);
const ClientTask = require('./ClientTask')(sequelize, DataTypes);
const ClientApproval = require('./ClientApproval')(sequelize, DataTypes);

const models = {
  sequelize,
  Sequelize,
  Client,
  PortalAccount,
  PortalMatter,
  PortalDocument,
  PortalMessage,
  AuditLog,
  Notification,
  FileAsset,
  ClientTask,
  ClientApproval,
};

Object.values(models).forEach((model) => {
  if (model && typeof model.associate === 'function') {
    model.associate(models);
  }
});

module.exports = models;
