'use strict';

const {
  VALIDATION_CHECKS,
  createCheck,
} = require('./validation-checks');

function createLiveProviderValidator({
  providerClient,
} = {}) {
  if (!providerClient) {
    throw new TypeError('providerClient is required');
  }

  async function validateAuthentication() {
    try {
      let result;

      if (providerClient.healthCheck) {
        result = await providerClient.healthCheck();

        if (
          result?.available === false ||
          result?.ok === false
        ) {
          throw new Error(
            result.error ||
            'Provider health check failed'
          );
        }
      } else if (providerClient.getEmployers) {
        result = await providerClient.getEmployers({
          page: 1,
          pageSize: 1,
        });
      } else {
        throw new TypeError(
          'Provider has no supported authentication probe'
        );
      }

      return createCheck(
        VALIDATION_CHECKS.PROVIDER_AUTHENTICATION,
        true,
        {
          provider:
            result?.provider ||
            providerClient.name ||
            'staffology',
        }
      );
    } catch (error) {
      return createCheck(
        VALIDATION_CHECKS.PROVIDER_AUTHENTICATION,
        false,
        { message: error.message }
      );
    }
  }

  return Object.freeze({
    validateAuthentication,
  });
}

module.exports = {
  createLiveProviderValidator,
};
