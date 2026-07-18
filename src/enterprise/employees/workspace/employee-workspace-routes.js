'use strict';

function createEmployeeWorkspaceRoutes({
  express,
  controller,
  middleware = [],
} = {}) {
  if (!express?.Router) {
    throw new TypeError(
      'Express Router is required'
    );
  }

  if (!controller?.get) {
    throw new TypeError(
      'Employee workspace controller is required'
    );
  }

  const router = express.Router();

  middleware.forEach((handler) => {
    router.use(handler);
  });

  router.get(
    '/employees/:employeeId/workspace',
    controller.get
  );

  return router;
}

module.exports = {
  createEmployeeWorkspaceRoutes,
};
