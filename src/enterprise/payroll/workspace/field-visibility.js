'use strict';

const {
  evaluateVisibilityRules,
} = require('./visibility-evaluator');

function isFieldVisible(field, employee = {}) {
  return evaluateVisibilityRules(
    field.visibleWhen,
    employee,
    field.metadata?.visibilityMode || 'all'
  );
}

function filterVisibleFields(
  fields = [],
  employee = {}
) {
  return Object.freeze(
    fields.filter((field) =>
      isFieldVisible(field, employee)
    )
  );
}

module.exports = {
  isFieldVisible,
  filterVisibleFields,
};
