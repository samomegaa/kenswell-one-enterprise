const {
  createEmployee,
} = require('./employee');

const {
  EmployeeConflictError,
} = require(
  './employee-repository-errors'
);

class EmployeeRepositoryService {
  constructor({ repository }) {
    this.repository = repository;
  }

  create(input) {
    const provider = input.provider || {};
    if (
      provider.provider &&
      provider.externalEmployeeId
    ) {
      const existing = this.repository
        .findByExternalReference({
          provider: provider.provider,
          externalEmployeeId:
            provider.externalEmployeeId,
        });
      if (existing) {
        throw new EmployeeConflictError(
          'Provider employee is already linked',
          {
            employeeId: existing.id,
            provider: provider.provider,
            externalEmployeeId:
              provider.externalEmployeeId,
          }
        );
      }
    }
    return this.repository.create(
      createEmployee(input)
    );
  }

  get(employeeId) {
    return this.repository.requireById(
      employeeId
    );
  }

  listForClient(clientId) {
    return this.repository.listByClient(clientId);
  }

  listForEmployer(employerId) {
    return this.repository
      .listByEmployer(employerId);
  }

  replace(employee) {
    return this.repository.replace(employee);
  }

  remove(employeeId) {
    return this.repository.remove(employeeId);
  }
}

module.exports = { EmployeeRepositoryService };
