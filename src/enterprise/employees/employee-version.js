const {
  EmployeePersistenceVersionError,
} = require(
  './employee-persistence-errors'
);

function assertEmployeeVersion(
  employee,
  expectedVersion
) {
  if (expectedVersion === null) {
    return employee.version;
  }

  if (employee.version !== expectedVersion) {
    throw new EmployeePersistenceVersionError(
      'Employee version mismatch',
      {
        employeeId: employee.id,
        expectedVersion,
        actualVersion: employee.version,
      }
    );
  }

  return employee.version;
}

function nextEmployeeVersion(employee) {
  const version =
    Number(employee.version || 0);

  return version + 1;
}

module.exports = {
  assertEmployeeVersion,
  nextEmployeeVersion,
};
