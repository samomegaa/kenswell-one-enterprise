const { ValidationRule } = require('./validation-rule');
const { validationSuccess, validationFailure } = require('./validation-result');

class ValidationBoundary {
  constructor(name = 'validation.boundary') {
    this.name = name;
    this.rules = [];
  }

  addRule(rule, validator, message) {
    const validationRule = rule instanceof ValidationRule
      ? rule
      : new ValidationRule(rule, validator, message);

    this.rules.push(validationRule);
    return this;
  }

  async validate(input, context = {}) {
    const errors = [];

    for (const rule of this.rules) {
      const result = await rule.validate(input, context);

      if (!result.ok) {
        errors.push(...result.errors);
      }
    }

    if (errors.length > 0) {
      return validationFailure(errors, {
        boundary: this.name,
        ruleCount: this.rules.length,
      });
    }

    return validationSuccess({
      boundary: this.name,
      ruleCount: this.rules.length,
    });
  }
}

module.exports = {
  ValidationBoundary,
};
