'use strict';

const {
  ACCESS,
  STATUS,
  DATA_CLASSIFICATION,
} = require('./staffology-catalogue-constants');

module.exports = Object.freeze([
  {
    id: 'employers.list',
    domain: 'employers',
    purpose: 'Discover Staffology employers',
    method: 'GET',
    kenswellPath: '/api/employers',
    access: ACCESS.READ,
    status: STATUS.VERIFIED,
    dataClassification: [
      DATA_CLASSIFICATION.INTERNAL,
    ],
  },
  {
    id: 'employers.get',
    domain: 'employers',
    purpose: 'Retrieve one Staffology employer',
    method: 'GET',
    kenswellPath:
      '/api/employers/:employerId',
    access: ACCESS.READ,
    status: STATUS.VERIFIED,
    dataClassification: [
      DATA_CLASSIFICATION.INTERNAL,
    ],
  },
]);
