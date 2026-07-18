'use strict';

const REQUIRED_ENVIRONMENT = Object.freeze([
  'STAFFOLOGY_API_KEY',
  'STAFFOLOGY_EMPLOYER_ID',
  'STAFFOLOGY_VALIDATION_EMPLOYEE_ID',
]);

function requireEnvironment(
  environment = process.env
) {
  const missing = REQUIRED_ENVIRONMENT
    .filter((name) => !environment[name]);

  if (missing.length) {
    throw new Error(
      `Missing environment variables: ${missing.join(', ')}`
    );
  }

  return Object.freeze({
    apiKey: environment.STAFFOLOGY_API_KEY,
    baseUrl:
      environment.STAFFOLOGY_BASE_URL ||
      'https://api.staffology.co.uk',
    username:
      environment.STAFFOLOGY_USERNAME ||
      'api',
    timeoutMs:
      Number(
        environment.STAFFOLOGY_TIMEOUT_MS ||
        30000
      ),
    employerId:
      environment.STAFFOLOGY_EMPLOYER_ID,
    employeeId:
      environment.STAFFOLOGY_VALIDATION_EMPLOYEE_ID,
  });
}

module.exports = {
  REQUIRED_ENVIRONMENT,
  requireEnvironment,
};
