const { createEmployee } = require('./employee');
const { createEmployeeIdentity } = require('./employee-identity');
const { createEmployment, EMPLOYMENT_STATUSES } = require('./employment');
const { createPayrollProfile } = require('./payroll-profile');
const { createTaxProfile } = require('./tax-profile');
const { createNationalInsurance } = require('./national-insurance');
const { createPensionProfile } = require('./pension-profile');
const { createBankAccount } = require('./bank-account');
const { createLeaveProfile } = require('./leave-profile');
const { createProviderReference } = require('./provider-reference');
const { createEmployeeAuditEvent } = require('./employee-audit');
const { EmployeeRepository } = require('./employee-repository');
const { EmployeeRepositoryService } = require('./employee-repository-service');
const repositoryErrors = require('./employee-repository-errors');

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
  EMPLOYMENT_STATUSES,
  ...repositoryErrors,
};
