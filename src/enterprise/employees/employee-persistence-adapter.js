const {
  PersistenceQuery,
  PersistenceTransaction,
} = require('../persistence');

const {
  toEmployeeRecord,
  fromEmployeeRecord,
} = require(
  './employee-persistence-mapper'
);

const {
  translatePersistenceError,
} = require(
  './employee-persistence-errors'
);

class EmployeePersistenceAdapter {
  constructor({
    adapter,
    transactionManager = null,
  } = {}) {
    if (!adapter) {
      throw new Error(
        'Employee persistence adapter is required'
      );
    }

    this.adapter = adapter;
    this.transaction =
      new PersistenceTransaction({
        adapter,
        transactionManager,
      });
  }

  async create(employee) {
    try {
      const record =
        toEmployeeRecord(employee);

      return fromEmployeeRecord(
        await this.adapter.create(record)
      );
    } catch (error) {
      throw translatePersistenceError(
        error
      );
    }
  }

  async update(
    employee,
    { expectedVersion = null } = {}
  ) {
    try {
      const record =
        toEmployeeRecord(employee);

      const saved =
        await this.adapter.update(
          record,
          { expectedVersion }
        );

      return fromEmployeeRecord(saved);
    } catch (error) {
      throw translatePersistenceError(
        error
      );
    }
  }

  async remove(employeeId) {
    try {
      return fromEmployeeRecord(
        await this.adapter.delete(
          employeeId
        )
      );
    } catch (error) {
      throw translatePersistenceError(
        error
      );
    }
  }

  async findById(employeeId) {
    const record =
      await this.adapter.findById(
        employeeId
      );

    return record
      ? fromEmployeeRecord(record)
      : null;
  }

  async findByClient(clientId) {
    return this.findMany({
      filters: { clientId },
      sort: ['createdAt:asc'],
    });
  }

  async findByEmployer(employerId) {
    return this.findMany({
      filters: { employerId },
      sort: ['createdAt:asc'],
    });
  }

  async findByExternalReference({
    provider,
    externalEmployeeId,
  }) {
    const result =
      await this.findMany({
        filters: {
          provider,
          externalEmployeeId,
        },
        limit: 1,
      });

    return result.items[0] || null;
  }

  async findMany(query = {}) {
    const normalized =
      PersistenceQuery.from(query);

    const result =
      await this.adapter.findMany(
        normalized
      );

    return Object.freeze({
      ...result,
      items: Object.freeze(
        result.items.map(
          fromEmployeeRecord
        )
      ),
    });
  }

  async count(query = {}) {
    return this.adapter.count(
      PersistenceQuery.from(query)
    );
  }

  async runInTransaction(work) {
    return this.transaction.run(
      async () => work(this)
    );
  }
}

module.exports = {
  EmployeePersistenceAdapter,
};
