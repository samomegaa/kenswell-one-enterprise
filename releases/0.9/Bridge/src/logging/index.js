const Logger = require('./Logger');

function createLogger(options = {}) {
  return new Logger(options);
}

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  service: process.env.APP_NAME || 'kenswell-one',
});

module.exports = {
  Logger,
  createLogger,
  logger,
  ...require('./logging.constants'),
};
