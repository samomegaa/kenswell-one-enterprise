'use strict';

const {
  READINESS_LEVEL_LIST,
} = require('./readiness-levels');

const {
  hasMeaningfulValue,
} = require('./readiness-value');

const {
  createReadinessResult,
} = require('./readiness-result');

const {
  getValueAtPath,
} = require('./value-accessor');

const {
  isFieldVisible,
} = require('./field-visibility');

class PayrollReadinessEngine {
  constructor({ fieldRegistry } = {}) {
    if (!fieldRegistry) {
      throw new TypeError(
        'Payroll field registry is required'
      );
    }

    this.fieldRegistry = fieldRegistry;
  }

  evaluateLevel(level, employee = {}) {
    if (!READINESS_LEVEL_LIST.includes(level)) {
      throw new TypeError(
        `Unsupported readiness level "${level}"`
      );
    }

    const requiredFields =
      this.fieldRegistry.listFields().filter(
        (field) =>
          field.requiredFor.includes(level) &&
          isFieldVisible(field, employee)
      );

    const missingFields = requiredFields
      .filter((field) => !hasMeaningfulValue(
        getValueAtPath(
          employee,
          field.providerBinding
        )
      ))
      .map((field) => Object.freeze({
        id: field.id,
        label: field.label,
        sectionId: field.sectionId,
        providerBinding: field.providerBinding,
      }));

    return createReadinessResult({
      level,
      required: requiredFields.length,
      completed:
        requiredFields.length - missingFields.length,
      missingFields,
    });
  }

  evaluate(employee = {}) {
    return Object.freeze(
      READINESS_LEVEL_LIST.reduce(
        (results, level) => ({
          ...results,
          [level]: this.evaluateLevel(
            level,
            employee
          ),
        }),
        {}
      )
    );
  }
}

function createPayrollReadinessEngine(options = {}) {
  return new PayrollReadinessEngine(options);
}

module.exports = {
  PayrollReadinessEngine,
  createPayrollReadinessEngine,
};
