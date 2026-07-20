'use strict';

const {
  ACCESS,
  STATUS,
  DATA_CLASSIFICATION,
} = require('./staffology-catalogue-constants');

module.exports = Object.freeze([
  {
    id: 'employees.list',
    domain: 'employees',
    purpose: 'Discover employer employees',
    method: 'GET',
    kenswellPath:
      '/api/employers/:employerId/employees',
    access: ACCESS.READ,
    status: STATUS.VERIFIED,
    dataClassification: [
      DATA_CLASSIFICATION.PERSONAL,
    ],
  },
  {
    id: 'employees.get',
    domain: 'employees',
    purpose: 'Retrieve one Staffology employee',
    method: 'GET',
    kenswellPath:
      '/api/employers/:employerId/' +
      'employees/:employeeId',
    access: ACCESS.READ,
    status: STATUS.VERIFIED,
    dataClassification: [
      DATA_CLASSIFICATION.PERSONAL,
      DATA_CLASSIFICATION.SENSITIVE_PERSONAL,
      DATA_CLASSIFICATION.TAX,
    ],
    workspaceTabs: [
      'basic-details',
      'employment',
    ],
  },
  {
    id: 'employees.workspace',
    domain: 'employees',
    purpose: 'Assemble employee workspace',
    method: 'GET',
    kenswellPath:
      '/api/employers/:employerId/' +
      'employees/:employeeId/workspace',
    access: ACCESS.READ,
    status: STATUS.VERIFIED,
    dataClassification: [
      DATA_CLASSIFICATION.PERSONAL,
      DATA_CLASSIFICATION.SENSITIVE_PERSONAL,
      DATA_CLASSIFICATION.FINANCIAL,
      DATA_CLASSIFICATION.TAX,
    ],
    workspaceTabs: [
      'basic-details',
      'employment',
    ],
  },
]);
