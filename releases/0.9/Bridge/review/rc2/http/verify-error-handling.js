const path = require('path');

const root = path.resolve(__dirname, '../../..');

const http = require(path.join(root, 'src/http'));

if (typeof http.errorHandler !== 'function') {
  throw new Error('errorHandler export missing');
}

if (typeof http.notFoundHandler !== 'function') {
  throw new Error('notFoundHandler export missing');
}

let notFoundStatus = null;
let notFoundPayload = null;

http.notFoundHandler(
  {
    requestId: 'req_test_123',
    originalUrl: '/missing',
  },
  {
    status(code) {
      notFoundStatus = code;
      return this;
    },
    json(payload) {
      notFoundPayload = payload;
      return payload;
    },
  }
);

if (notFoundStatus !== 404) {
  throw new Error('notFoundHandler did not return 404');
}

if (!notFoundPayload || notFoundPayload.success !== false) {
  throw new Error('notFoundHandler did not use error envelope');
}

if (notFoundPayload.error.code !== 'not_found') {
  throw new Error('notFoundHandler did not use not_found code');
}

if (notFoundPayload.meta.requestId !== 'req_test_123') {
  throw new Error('notFoundHandler did not include requestId');
}

let errorStatus = null;
let errorPayload = null;

const error = new Error('Test failure');
error.statusCode = 418;
error.code = 'teapot_error';

http.errorHandler(
  error,
  {
    requestId: 'req_error_123',
  },
  {
    headersSent: false,
    status(code) {
      errorStatus = code;
      return this;
    },
    json(payload) {
      errorPayload = payload;
      return payload;
    },
  },
  () => {}
);

if (errorStatus !== 418) {
  throw new Error('errorHandler did not preserve statusCode');
}

if (errorPayload.error.code !== 'teapot_error') {
  throw new Error('errorHandler did not preserve error code');
}

if (errorPayload.meta.requestId !== 'req_error_123') {
  throw new Error('errorHandler did not include requestId');
}

console.log('API error handling and 404 standardisation verified');
