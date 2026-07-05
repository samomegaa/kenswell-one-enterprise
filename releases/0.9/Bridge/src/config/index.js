const appConfig = require('./app.config');
const authConfig = require('./auth.config');
const databaseConfig = require('./database.config');
const securityConfig = require('./security.config');
const notificationConfig = require('./notification.config');
const storageConfig = require('./storage.config');
const clientPortalConfig = require('./clientPortal.config');

function createConfig(env = process.env) {
  return Object.freeze({
    app: appConfig(env),
    auth: authConfig(env),
    database: databaseConfig(env),
    security: securityConfig(env),
    notifications: notificationConfig(env),
    storage: storageConfig(env),
    clientPortal: clientPortalConfig(env),
  });
}

function getConfig() {
  return createConfig(process.env);
}

module.exports = {
  get config() {
    return getConfig();
  },
  getConfig,
  createConfig,
  appConfig,
  authConfig,
  databaseConfig,
  securityConfig,
  notificationConfig,
  storageConfig,
  clientPortalConfig,
};
