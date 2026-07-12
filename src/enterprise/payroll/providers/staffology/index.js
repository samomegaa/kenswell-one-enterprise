const {
  StaffologyClient,
} = require('./staffology-client');

const {
  StaffologyPayrollProvider,
  createStaffologyPayrollProvider,
} = require('./staffology-provider');

const {
  splitPayeReference,
  extractItems,
  mapEmployer,
  mapEmployerSummary,
  mapEmployerDetail,
  mapPayOptions,
  mapEmployee,
  mapEmployeeSummary,
  mapEmployeeDetail,
  mapPayScheduleSummary,
  applyPayInstruction,
  normaliseJobStatus,
} = require('./staffology-mappers');

const {
  StaffologyConfigurationError,
  StaffologyApiError,
  StaffologySafetyError,
  StaffologyValidationError,
} = require('./staffology-errors');

module.exports = {
  StaffologyClient,

  StaffologyPayrollProvider,
  createStaffologyPayrollProvider,

  splitPayeReference,
  extractItems,
  mapEmployer,
  mapEmployerSummary,
  mapEmployerDetail,
  mapPayOptions,
  mapEmployee,
  mapEmployeeSummary,
  mapEmployeeDetail,
  mapPayScheduleSummary,
  applyPayInstruction,
  normaliseJobStatus,

  StaffologyConfigurationError,
  StaffologyApiError,
  StaffologySafetyError,
  StaffologyValidationError,
};
