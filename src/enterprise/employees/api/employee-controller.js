const {
  validateCreateEmployee,
  validateUpdateEmployee,
} = require(
  './employee-api-validation'
);

const {
  success,
  failure,
  send,
} = require('./employee-api-response');

function requestContext(req) {
  return {
    actorId:
      req.user?.id || null,
    tenantId:
      req.enterpriseContext
        ?.tenantId || null,
    requestId:
      req.id ||
      req.headers?.['x-request-id'] ||
      null,
  };
}

function createEmployeeController({
  service,
}) {
  const execute =
    (handler) =>
      async (req, res) => {
        try {
          return send(
            res,
            await handler(req)
          );
        } catch (error) {
          return send(
            res,
            failure(error)
          );
        }
      };

  return {
    list: execute(async () =>
      success(await service.list())
    ),

    get: execute(async (req) =>
      success(
        await service.get(
          req.params.employeeId
        )
      )
    ),

    create: execute(async (req) =>
      success(
        await service.create(
          validateCreateEmployee(
            req.body
          ),
          requestContext(req)
        ),
        { status: 201 }
      )
    ),

    update: execute(async (req) => {
      const input =
        validateUpdateEmployee(
          req.body
        );

      return success(
        await service.update(
          req.params.employeeId,
          input.version,
          input.changes,
          requestContext(req)
        )
      );
    }),

    remove: execute(async (req) =>
      success(
        await service.remove(
          req.params.employeeId,
          requestContext(req)
        )
      )
    ),

    listForClient:
      execute(async (req) =>
        success(
          await service.listForClient(
            req.params.clientId
          )
        )
      ),

    listForEmployer:
      execute(async (req) =>
        success(
          await service.listForEmployer(
            req.params.employerId
          )
        )
      ),

    findByProvider:
      execute(async (req) =>
        success(
          await service.findByProvider(
            req.params.provider,
            req.params
              .externalEmployeeId
          )
        )
      ),
  };
}

module.exports = {
  createEmployeeController,
};
