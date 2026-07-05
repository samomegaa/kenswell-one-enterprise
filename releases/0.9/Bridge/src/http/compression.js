const compression = require('compression');

function compressionMiddleware() {
  return compression({
    threshold: 1024,
  });
}

module.exports = compressionMiddleware;
