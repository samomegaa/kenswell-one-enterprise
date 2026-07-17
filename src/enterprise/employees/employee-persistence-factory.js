const {
  persistenceAdapterFactory,
  persistenceRegistry,
} = require('../persistence');

const {
  EmployeePersistenceAdapter,
} = require(
  './employee-persistence-adapter'
);

function createEmployeePersistence({
  type = 'memory',
  options = {},
  registry =
    persistenceRegistry,
  name = 'employees',
  replace = false,
  transactionManager = null,
} = {}) {
  const adapter =
    persistenceAdapterFactory.create(
      type,
      options
    );

  const employeePersistence =
    new EmployeePersistenceAdapter({
      adapter,
      transactionManager,
    });

  registry.register(
    name,
    employeePersistence,
    { replace }
  );

  return employeePersistence;
}

module.exports = {
  createEmployeePersistence,
};
