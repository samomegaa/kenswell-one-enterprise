'use strict';

const {
  success,
  failure,
  send,
} = require('../api/employee-api-response');

function createEmployeeWorkspaceController({
  service,
} = {}) {
  if (!service) {
    throw new TypeError(
      'Employee workspace service is required'
    );
  }

  return {
    get: async (req, res) => {
      try {
        return send(
          res,
          success(
            await service.get(
              req.params.employeeId
            )
          )
        );
      } catch (error) {
        return send(res, failure(error));
      }
    },
  };
}

module.exports = {
  createEmployeeWorkspaceController,
};
