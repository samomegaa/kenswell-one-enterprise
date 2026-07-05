const {
  optional,
} = require('./validation');

function loggingConfig(env = process.env) {
  return {
    level: optional(env, 'LOG_LEVEL', 'info'),
    service: optional(env, 'APP_NAME', 'kenswell-one'),
  };
}

module.exports = loggingConfig;
