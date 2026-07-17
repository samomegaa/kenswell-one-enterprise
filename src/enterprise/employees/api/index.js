const {
  EmployeeApiService,
} = require('./employee-api-service');

const {
  createEmployeeController,
} = require('./employee-controller');

const {
  createEmployeeRoutes,
} = require('./employee-routes');

const validation = require(
  './employee-api-validation'
);

const response = require(
  './employee-api-response'
);

const errors = require(
  './employee-api-errors'
);

function createEmployeeApi({
  express,
  persistence,
  middleware = [],
}) {
  const service =
    new EmployeeApiService({
      persistence,
    });

  const controller =
    createEmployeeController({
      service,
    });

  const router =
    createEmployeeRoutes({
      express,
      controller,
      middleware,
    });

  return Object.freeze({
    service,
    controller,
    router,
  });
}

module.exports = {
  EmployeeApiService,
  createEmployeeController,
  createEmployeeRoutes,
  createEmployeeApi,
  ...validation,
  ...response,
  ...errors,
};
