const {
  optional,
} = require('./validation');

function notificationConfig(env = process.env) {
  return {
    provider: optional(env, 'NOTIFICATION_PROVIDER', 'null'),
    fromEmail: optional(env, 'NOTIFICATION_FROM_EMAIL', 'no-reply@kenswell.one'),
  };
}

module.exports = notificationConfig;
