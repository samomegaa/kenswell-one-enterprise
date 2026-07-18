'use strict';

const {
  SUPPORTED_FIELD_TYPES,
  SUPPORTED_FIELD_CONTROLS,
} = require('./field-types');

const {
  normaliseVisibilityRules,
} = require('./visibility-rule');

function freezeArray(value = []) {
  return Object.freeze([...(value || [])]);
}

function createFieldDefinition(input = {}) {
  const id = String(input.id || '').trim();
  const sectionId = String(input.sectionId || '').trim();
  const type = String(input.type || 'string');
  const control = String(input.control || 'text');

  if (!id) {
    throw new TypeError('Payroll field id is required');
  }

  if (!sectionId) {
    throw new TypeError(
      `Payroll field "${id}" requires a sectionId`
    );
  }

  if (!SUPPORTED_FIELD_TYPES.includes(type)) {
    throw new TypeError(
      `Unsupported payroll field type "${type}"`
    );
  }

  if (!SUPPORTED_FIELD_CONTROLS.includes(control)) {
    throw new TypeError(
      `Unsupported payroll field control "${control}"`
    );
  }

  return Object.freeze({
    id,
    label: String(input.label || id),
    sectionId,
    order: Number(input.order || 0),
    type,
    control,
    providerBinding:
      String(input.providerBinding || id),
    helpText: String(input.helpText || ''),
    placeholder: input.placeholder || null,
    requiredFor: freezeArray(input.requiredFor),
    validators: freezeArray(input.validators),
    options: Object.freeze(
      (input.options || []).map((option) =>
        Object.freeze({ ...option })
      )
    ),
    visibleWhen: normaliseVisibilityRules(
      input.visibleWhen
    ),
    readOnly: Boolean(input.readOnly),
    sensitive: Boolean(input.sensitive),
    metadata: Object.freeze({
      ...(input.metadata || {}),
    }),
  });
}

module.exports = {
  createFieldDefinition,
};
