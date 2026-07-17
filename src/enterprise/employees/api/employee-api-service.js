const {
  createEmployee,
} = require('../employee');

const {
  EmployeeApiNotFoundError,
  EmployeeApiConflictError,
} = require('./employee-api-errors');

function mergeEmployee(
  employee,
  changes
) {
  const next = { ...employee };

  for (
    const [section, value]
    of Object.entries(changes)
  ) {
    next[section] = Object.freeze({
      ...employee[section],
      ...value,
    });
  }

  return Object.freeze(next);
}

class EmployeeApiService {
  constructor({ persistence }) {
    if (!persistence) {
      throw new Error(
        'Employee persistence service is required'
      );
    }

    this.persistence = persistence;
  }

  async list() {
    return this.persistence
      .persistence.findMany();
  }

  async get(employeeId) {
    const employee =
      await this.persistence.get(
        employeeId
      );

    if (!employee) {
      throw new EmployeeApiNotFoundError(
        employeeId
      );
    }

    return employee;
  }

  async create(input, context = {}) {
    const employee =
      createEmployee(input);

    if (
      employee.provider.provider &&
      employee.provider
        .externalEmployeeId
    ) {
      const existing =
        await this.persistence
          .persistence
          .findByExternalReference({
            provider:
              employee.provider.provider,
            externalEmployeeId:
              employee.provider
                .externalEmployeeId,
          });

      if (existing) {
        throw new EmployeeApiConflictError(
          'Provider employee is already linked',
          {
            employeeId: existing.id,
          }
        );
      }
    }

    return this.persistence.create(
      employee,
      context
    );
  }

  async update(
    employeeId,
    version,
    changes,
    context = {}
  ) {
    const current =
      await this.get(employeeId);

    if (current.version !== version) {
      throw new EmployeeApiConflictError(
        'Employee version mismatch',
        {
          employeeId,
          expectedVersion: version,
          actualVersion:
            current.version,
        }
      );
    }

    return this.persistence.update(
      mergeEmployee(current, changes),
      {
        expectedVersion: version,
        context,
      }
    );
  }

  async remove(
    employeeId,
    context = {}
  ) {
    await this.get(employeeId);

    return this.persistence.remove(
      employeeId,
      context
    );
  }

  async listForClient(clientId) {
    return this.persistence
      .listForClient(clientId);
  }

  async listForEmployer(employerId) {
    return this.persistence
      .listForEmployer(employerId);
  }

  async findByProvider(
    provider,
    externalEmployeeId
  ) {
    const employee =
      await this.persistence
        .persistence
        .findByExternalReference({
          provider,
          externalEmployeeId,
        });

    if (!employee) {
      throw new EmployeeApiNotFoundError(
        externalEmployeeId
      );
    }

    return employee;
  }
}

module.exports = {
  EmployeeApiService,
};
