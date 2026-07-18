'use strict';

const {
  getValueAtPath,
} = require('./value-accessor');

const {
  isFieldVisible,
} = require('./field-visibility');

class DynamicFieldRenderer {
  constructor() {
    this.controls = new Map();
  }

  registerControl(control, renderer) {
    const id = String(control || '').trim();

    if (!id) {
      throw new TypeError('Control id is required');
    }

    if (typeof renderer !== 'function') {
      throw new TypeError(
        `Renderer for "${id}" must be a function`
      );
    }

    if (this.controls.has(id)) {
      throw new Error(
        `Control renderer "${id}" is already registered`
      );
    }

    this.controls.set(id, renderer);
    return this;
  }

  hasControl(control) {
    return this.controls.has(control);
  }

  renderField({
    field,
    employee = {},
    onChange = null,
    context = {},
  } = {}) {
    if (!field) {
      throw new TypeError('Field definition is required');
    }

    if (!isFieldVisible(field, employee)) {
      return null;
    }

    const renderer = this.controls.get(field.control);

    if (!renderer) {
      throw new Error(
        `No renderer registered for control ` +
        `"${field.control}"`
      );
    }

    return renderer({
      field,
      value: getValueAtPath(
        employee,
        field.providerBinding
      ),
      employee,
      onChange,
      context,
    });
  }

  renderSection({
    section,
    employee = {},
    onChange = null,
    context = {},
  } = {}) {
    return Object.freeze(
      (section.fields || [])
        .map((field) =>
          this.renderField({
            field,
            employee,
            onChange,
            context,
          })
        )
        .filter(Boolean)
    );
  }
}

function createDynamicFieldRenderer() {
  return new DynamicFieldRenderer();
}

module.exports = {
  DynamicFieldRenderer,
  createDynamicFieldRenderer,
};
