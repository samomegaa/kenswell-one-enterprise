'use strict';

const {
  hasMeaningfulValue,
} = require('./readiness-value');

const {
  getValueAtPath,
} = require('./value-accessor');

const {
  isFieldVisible,
} = require('./field-visibility');

function createSectionReadiness({
  schema,
  employee = {},
} = {}) {
  return Object.freeze(
    schema.sections.map((section) => {
      const readinessFields = section.fields.filter(
        (field) =>
          field.requiredFor.length > 0 &&
          isFieldVisible(field, employee)
      );

      const missingFields = readinessFields.filter(
        (field) => !hasMeaningfulValue(
          getValueAtPath(
            employee,
            field.providerBinding
          )
        )
      );

      const required = readinessFields.length;
      const completed = required - missingFields.length;

      return Object.freeze({
        sectionId: section.id,
        title: section.title,
        required,
        completed,
        missing: missingFields.length,
        score: required === 0
          ? 100
          : Math.round((completed / required) * 100),
        status:
          missingFields.length === 0
            ? 'ready'
            : 'incomplete',
        missingFields: Object.freeze(
          missingFields.map((field) =>
            Object.freeze({
              id: field.id,
              label: field.label,
            })
          )
        ),
      });
    })
  );
}

module.exports = {
  createSectionReadiness,
};
