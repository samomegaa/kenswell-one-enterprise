'use strict';

const {
  ACCESS,
  STATUS,
  DATA_CLASSIFICATION,
} = require('./staffology-catalogue-constants');

function planned(
  id,
  domain,
  purpose,
  tab,
  classifications
) {
  return {
    id,
    domain,
    purpose,
    method: 'GET',
    kenswellPath: null,
    access: ACCESS.READ,
    status: STATUS.PLANNED,
    dataClassification: classifications,
    workspaceTabs: [tab],
  };
}

module.exports = Object.freeze([
  planned(
    'employees.pay-options',
    'pay-options',
    'Retrieve employee pay options',
    'pay-options',
    [
      DATA_CLASSIFICATION.FINANCIAL,
      DATA_CLASSIFICATION.TAX,
    ]
  ),
  planned(
    'employees.attachment-orders',
    'attachment-orders',
    'Retrieve employee attachment orders',
    'attachment-orders',
    [
      DATA_CLASSIFICATION.FINANCIAL,
      DATA_CLASSIFICATION.SENSITIVE_PERSONAL,
    ]
  ),
  planned(
    'employees.bank-account',
    'bank-account',
    'Retrieve employee banking information',
    'bank-account',
    [
      DATA_CLASSIFICATION.FINANCIAL,
      DATA_CLASSIFICATION.SENSITIVE_PERSONAL,
    ]
  ),
  planned(
    'employees.leave',
    'leave',
    'Retrieve employee leave information',
    'leave',
    [
      DATA_CLASSIFICATION.PERSONAL,
    ]
  ),
  planned(
    'employees.pension',
    'pension',
    'Retrieve employee pension information',
    'pension',
    [
      DATA_CLASSIFICATION.FINANCIAL,
      DATA_CLASSIFICATION.PERSONAL,
    ]
  ),
  planned(
    'employees.notes',
    'notes',
    'Retrieve employee notes',
    'notes',
    [
      DATA_CLASSIFICATION.PERSONAL,
      DATA_CLASSIFICATION.SENSITIVE_PERSONAL,
    ]
  ),
]);
