'use strict';

const {
  StaffologyClient,
} = require(
  '../../../../src/enterprise/payroll/providers/staffology/staffology-client'
);

const {
  StaffologyPayrollProvider,
} = require(
  '../../../../src/enterprise/payroll/providers/staffology/staffology-provider'
);

function createLiveProvider(configuration) {
  const client = new StaffologyClient({
    apiKey: configuration.apiKey,
    baseUrl: configuration.baseUrl,
    username: configuration.username,
    timeoutMs: configuration.timeoutMs,
  });

  const provider =
    new StaffologyPayrollProvider({
      client,
      mode: 'test',
      metadata: {
        validationOnly: true,
      },
    });

  return Object.freeze({
    client,
    provider,
  });
}

module.exports = {
  createLiveProvider,
};
