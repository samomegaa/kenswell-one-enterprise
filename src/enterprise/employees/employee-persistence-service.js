const {
  nextEmployeeVersion,
} = require('./employee-version');

class EmployeePersistenceService {
  constructor({
    persistence,
    audit = null,
    eventBus = null,
  } = {}) {
    if (!persistence) {
      throw new Error(
        'Employee persistence is required'
      );
    }

    this.persistence = persistence;
    this.audit = audit;
    this.eventBus = eventBus;
  }

  async create(employee, context = {}) {
    return this.persistence
      .runInTransaction(
        async (store) => {
          const saved =
            await store.create(employee);

          await this.record(
            'employee.created',
            saved,
            context
          );

          return saved;
        }
      );
  }

  async update(
    employee,
    {
      expectedVersion =
        employee.version,
      context = {},
    } = {}
  ) {
    const now =
      new Date().toISOString();

    const next = Object.freeze({
      ...employee,
      version:
        nextEmployeeVersion(employee),
      updatedAt: now,
    });

    return this.persistence
      .runInTransaction(
        async (store) => {
          const saved =
            await store.update(next, {
              expectedVersion,
            });

          await this.record(
            'employee.updated',
            saved,
            context
          );

          return saved;
        }
      );
  }

  async remove(
    employeeId,
    context = {}
  ) {
    return this.persistence
      .runInTransaction(
        async (store) => {
          const removed =
            await store.remove(
              employeeId
            );

          await this.record(
            'employee.removed',
            removed,
            context
          );

          return removed;
        }
      );
  }

  async get(employeeId) {
    return this.persistence.findById(
      employeeId
    );
  }

  async listForClient(clientId) {
    return this.persistence
      .findByClient(clientId);
  }

  async listForEmployer(employerId) {
    return this.persistence
      .findByEmployer(employerId);
  }

  async record(type, employee, context) {
    if (this.audit?.record) {
      await this.audit.record({
        type,
        employeeId: employee.id,
        context,
      });
    }

    if (this.eventBus?.publish) {
      await this.eventBus.publish(
        type,
        {
          employeeId: employee.id,
          clientId: employee.clientId,
          employerId:
            employee.employerId,
          version: employee.version,
        }
      );
    }
  }
}

module.exports = {
  EmployeePersistenceService,
};
