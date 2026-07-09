const { validationSuccess, validationFailure } = require('./validation-result');

class ValidationRule {
  constructor(name, validator, message = 'Validation failed') {
    if (!name || typeof name !== 'string') {
      throw new Error('validation rule name is required');
    }

    if (typeof validator !== 'function') {
      throw new Error('validation rule validator must be a function');
    }

    this.name = name;
    this.validator = validator;
    this.message = message;
  }

  async validate(input, context = {}) {
    const passed = await this.validator(input, context);

    if (passed === true) {
      return validationSuccess({
        rule: this.name,
      });
    }

    return validationFailure([
      {
        rule: this.name,
        message: typeof passed === 'string' ? passed : this.message,
      },
    ]);
  }
}

module.exports = {
  ValidationRule,
};
