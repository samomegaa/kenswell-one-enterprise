const {
  EmployeePersistenceMappingError,
} = require(
  './employee-persistence-errors'
);

function createEmployeeRecord({
  id,
  clientId,
  employerId,
  version = 1,
  createdAt,
  updatedAt,
  provider = null,
  externalEmployeeId = null,
  payload,
} = {}) {
  if (
    !id ||
    !clientId ||
    !employerId ||
    !payload
  ) {
    throw new EmployeePersistenceMappingError(
      'Employee record is incomplete',
      {
        id,
        clientId,
        employerId,
      }
    );
  }

  return Object.freeze({
    id,
    clientId,
    employerId,
    version,
    createdAt,
    updatedAt,
    provider,
    externalEmployeeId,
    payload: Object.freeze({
      ...payload,
    }),
  });
}

module.exports = {
  createEmployeeRecord,
};
