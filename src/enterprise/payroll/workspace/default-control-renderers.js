'use strict';

const {
  FIELD_CONTROLS,
} = require('./field-types');

function descriptor(kind) {
  return ({ field, value }) =>
    Object.freeze({
      component: kind,
      id: field.id,
      label: field.label,
      value,
      readOnly: field.readOnly,
      sensitive: field.sensitive,
      placeholder: field.placeholder,
      options: field.options,
      helpText: field.helpText,
    });
}

function registerDefaultControlRenderers(renderer) {
  renderer
    .registerControl(
      FIELD_CONTROLS.TEXT,
      descriptor('TextField')
    )
    .registerControl(
      FIELD_CONTROLS.EMAIL,
      descriptor('EmailField')
    )
    .registerControl(
      FIELD_CONTROLS.TELEPHONE,
      descriptor('TelephoneField')
    )
    .registerControl(
      FIELD_CONTROLS.TEXTAREA,
      descriptor('TextareaField')
    )
    .registerControl(
      FIELD_CONTROLS.NUMBER,
      descriptor('NumberField')
    )
    .registerControl(
      FIELD_CONTROLS.DATE,
      descriptor('DateField')
    )
    .registerControl(
      FIELD_CONTROLS.DATETIME,
      descriptor('DateTimeField')
    )
    .registerControl(
      FIELD_CONTROLS.CHECKBOX,
      descriptor('CheckboxField')
    )
    .registerControl(
      FIELD_CONTROLS.SELECT,
      descriptor('SelectField')
    )
    .registerControl(
      FIELD_CONTROLS.CURRENCY,
      descriptor('CurrencyField')
    )
    .registerControl(
      FIELD_CONTROLS.PERCENTAGE,
      descriptor('PercentageField')
    )
    .registerControl(
      FIELD_CONTROLS.READ_ONLY,
      descriptor('ReadOnlyField')
    )
    .registerControl(
      FIELD_CONTROLS.JSON,
      descriptor('JsonField')
    );

  return renderer;
}

module.exports = {
  registerDefaultControlRenderers,
};
