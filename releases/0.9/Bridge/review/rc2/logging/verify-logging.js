const path = require('path');

const root = path.resolve(__dirname, '../../..');

const {
  createLogger,
  Logger,
  LOG_LEVELS,
} = require(path.join(root, 'src/logging'));

const {
  createConfig,
} = require(path.join(root, 'src/config'));

const lines = [];

const stream = {
  log(line) {
    lines.push(line);
  },
  warn(line) {
    lines.push(line);
  },
  error(line) {
    lines.push(line);
  },
};

const logger = createLogger({
  level: 'debug',
  service: 'kenswell-test',
  stream,
});

logger.debug('debug_event', { value: 1 });
logger.info('info_event', { value: 2 });
logger.warn('warn_event', { value: 3 });
logger.error('error_event', { value: 4 });

if (lines.length !== 4) {
  throw new Error('Logger did not write expected number of lines');
}

for (const line of lines) {
  const parsed = JSON.parse(line);

  if (!parsed.level || !parsed.event || !parsed.timestamp || parsed.service !== 'kenswell-test') {
    throw new Error('Invalid structured log line');
  }
}

const config = createConfig({
  NODE_ENV: 'test',
  APP_NAME: 'Kenswell Logging Test',
  LOG_LEVEL: 'warn',
  DATABASE_URL: 'postgres://user:pass@localhost:5432/kenswell_one',
  CLIENT_PORTAL_JWT_SECRET: 'development-secret-long-enough',
});

if (config.logging.level !== 'warn') {
  throw new Error('Logging config did not parse LOG_LEVEL');
}

if (typeof Logger !== 'function') {
  throw new Error('Logger export missing');
}

if (!LOG_LEVELS.INFO) {
  throw new Error('LOG_LEVELS export missing');
}

console.log('Enterprise logging foundation verified');
