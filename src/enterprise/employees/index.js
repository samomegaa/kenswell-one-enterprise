const {
  createEmployee,
} = require('./employee');

const {
  createEmployeeIdentity,
} = require('./employee-identity');

const {
  createEmployment,
  EMPLOYMENT_STATUSES,
} = require('./employment');

const {
  createPayrollProfile,
} = require('./payroll-profile');

const {
  createTaxProfile,
} = require('./tax-profile');

const {
  createNationalInsurance,
} = require('./national-insurance');

const {
  createPensionProfile,
} = require('./pension-profile');

const {
  createBankAccount,
} = require('./bank-account');

const {
  createLeaveProfile,
} = require('./leave-profile');

const {
  createProviderReference,
} = require('./provider-reference');

const {
  createEmployeeAuditEvent,
} = require('./employee-audit');

const {
  EmployeeRepository,
} = require('./employee-repository');

const {
  EmployeeRepositoryService,
} = require(
  './employee-repository-service'
);

const {
  EmployeePersistenceAdapter,
} = require(
  './employee-persistence-adapter'
);

const {
  EmployeePersistenceService,
} = require(
  './employee-persistence-service'
);

const {
  createEmployeePersistence,
} = require(
  './employee-persistence-factory'
);

const mapper = require(
  './employee-persistence-mapper'
);

const version = require(
  './employee-version'
);

const repositoryErrors = require(
  './employee-repository-errors'
);

const persistenceErrors = require(
  './employee-persistence-errors'
);

const api = require('./api');

module.exports = {
  createEmployee,
  createEmployeeIdentity,
  createEmployment,
  createPayrollProfile,
  createTaxProfile,
  createNationalInsurance,
  createPensionProfile,
  createBankAccount,
  createLeaveProfile,
  createProviderReference,
  createEmployeeAuditEvent,
  EmployeeRepository,
  EmployeeRepositoryService,
  EmployeePersistenceAdapter,
  EmployeePersistenceService,
  createEmployeePersistence,
  EMPLOYMENT_STATUSES,
  ...mapper,
  ...version,
  ...repositoryErrors,
  ...persistenceErrors,
  ...api,
};
