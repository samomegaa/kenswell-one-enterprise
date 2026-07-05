const {
  optional,
  number,
} = require('./validation');

function appConfig(env = process.env) {
  return {
    name: optional(env, 'APP_NAME', 'Kenswell One'),
    environment: optional(env, 'NODE_ENV', 'development'),
    port: number(env, 'PORT', 3000),
    trustProxy: optional(env, 'TRUST_PROXY', 'loopback'),
  };
}

module.exports = appConfig;
