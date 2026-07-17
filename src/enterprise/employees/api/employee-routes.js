function createEmployeeRoutes({
  express,
  controller,
  middleware = [],
}) {
  if (!express?.Router) {
    throw new Error(
      'Express Router is required'
    );
  }

  const router = express.Router();

  for (const handler of middleware) {
    router.use(handler);
  }

  router.get(
    '/employees',
    controller.list
  );

  router.post(
    '/employees',
    controller.create
  );

  router.get(
    '/employees/:employeeId',
    controller.get
  );

  router.put(
    '/employees/:employeeId',
    controller.update
  );

  router.delete(
    '/employees/:employeeId',
    controller.remove
  );

  router.get(
    '/clients/:clientId/employees',
    controller.listForClient
  );

  router.get(
    '/employers/:employerId/employees',
    controller.listForEmployer
  );

  router.get(
    '/providers/:provider/employees/' +
      ':externalEmployeeId',
    controller.findByProvider
  );

  return router;
}

module.exports = {
  createEmployeeRoutes,
};
