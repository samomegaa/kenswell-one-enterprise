const {
  required,
  boolean,
} = require('./validation');

function databaseConfig(env = process.env) {
  return {
    url: required(env, 'DATABASE_URL'),
    logging: boolean(env, 'SEQUELIZE_LOGGING', false),
  };
}

module.exports = databaseConfig;
