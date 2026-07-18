'use strict';

const {
  evaluateVisibilityRules,
} = require('./visibility-evaluator');

const {
  filterVisibleFields,
} = require('./field-visibility');

function isSectionVisible(section, employee = {}) {
  if (
    Array.isArray(section.visibleWhen) &&
    section.visibleWhen.length > 0
  ) {
    return evaluateVisibilityRules(
      section.visibleWhen,
      employee,
      section.metadata?.visibilityMode || 'all'
    );
  }

  return true;
}

function createVisibleWorkspaceSchema({
  schema,
  employee = {},
  includeEmptySections = true,
} = {}) {
  if (!schema) {
    throw new TypeError(
      'Payroll workspace schema is required'
    );
  }

  const sections = schema.sections
    .filter((section) =>
      isSectionVisible(section, employee)
    )
    .map((section) => Object.freeze({
      ...section,
      fields: filterVisibleFields(
        section.fields,
        employee
      ),
    }))
    .filter((section) =>
      includeEmptySections ||
      section.fields.length > 0
    );

  return Object.freeze({
    ...schema,
    sections: Object.freeze(sections),
    fieldCount: sections.reduce(
      (total, section) =>
        total + section.fields.length,
      0
    ),
  });
}

module.exports = {
  isSectionVisible,
  createVisibleWorkspaceSchema,
};
