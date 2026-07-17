const {
  EmployeeNotFoundError,
  EmployeeConflictError,
} = require(
  './employee-repository-errors'
);

class EmployeeRepository {
  constructor({ records = [] } = {}) {
    this.records = new Map(
      records.map((employee) => [
        employee.id,
        employee,
      ])
    );
  }

  create(employee) {
    if (this.records.has(employee.id)) {
      throw new EmployeeConflictError(
        'Employee already exists',
        { employeeId: employee.id }
      );
    }
    this.records.set(employee.id, employee);
    return employee;
  }

  getById(employeeId) {
    return this.records.get(employeeId) || null;
  }

  requireById(employeeId) {
    const employee = this.getById(employeeId);
    if (!employee) {
      throw new EmployeeNotFoundError(employeeId);
    }
    return employee;
  }

  list() {
    return Object.freeze([
      ...this.records.values(),
    ]);
  }

  listByClient(clientId) {
    return Object.freeze(
      this.list().filter(
        (employee) =>
          employee.clientId === clientId
      )
    );
  }

  listByEmployer(employerId) {
    return Object.freeze(
      this.list().filter(
        (employee) =>
          employee.employerId === employerId
      )
    );
  }

  findByExternalReference({
    provider,
    externalEmployeeId,
  }) {
    return (
      this.list().find(
        (employee) =>
          employee.provider?.provider ===
            provider &&
          employee.provider
            ?.externalEmployeeId ===
            externalEmployeeId
      ) || null
    );
  }

  replace(employee) {
    if (!this.records.has(employee.id)) {
      throw new EmployeeNotFoundError(
        employee.id
      );
    }
    this.records.set(employee.id, employee);
    return employee;
  }

  remove(employeeId) {
    const employee = this.requireById(employeeId);
    this.records.delete(employeeId);
    return employee;
  }

  count() {
    return this.records.size;
  }
}

module.exports = { EmployeeRepository };
