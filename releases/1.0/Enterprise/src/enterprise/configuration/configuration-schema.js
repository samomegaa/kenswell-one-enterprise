const {
  ConfigurationValidationError,
} = require('./configuration-errors');

class ConfigurationSchema {
  constructor(definition = {}) {
    this.definition = Object.freeze({ ...definition });
  }

  validate(snapshot) {
    const errors = [];

    for (const [key, rule] of Object.entries(this.definition)) {
      const value = snapshot[key];

      if (rule.required && value === undefined) {
        errors.push({
          key,
          message: 'configuration value is required',
        });
        continue;
      }

      if (value !== undefined && rule.type && typeof value !== rule.type) {
        errors.push({
          key,
          message: `expected type ${rule.type}`,
          actual: typeof value,
        });
      }
    }

    if (errors.length > 0) {
      throw new ConfigurationValidationError('configuration schema validation failed', {
        errors,
      });
    }

    return Object.freeze({
      ok: true,
      errors: [],
    });
  }
}

function createConfigurationSchema(definition = {}) {
  return new ConfigurationSchema(definition);
}

module.exports = {
  ConfigurationSchema,
  createConfigurationSchema,
};
