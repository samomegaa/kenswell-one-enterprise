'use strict';

const {
  createFieldDefinition,
} = require('./field-definition');

class PayrollFieldRegistry {
  constructor({
    workspaceRegistry,
    fields = [],
  } = {}) {
    if (!workspaceRegistry) {
      throw new TypeError(
        'Workspace schema registry is required'
      );
    }

    this.workspaceRegistry = workspaceRegistry;
    this.fields = new Map();

    fields.forEach((field) => {
      this.registerField(field);
    });
  }

  registerField(input) {
    const field = createFieldDefinition(input);

    if (!this.workspaceRegistry.hasSection(
      field.sectionId
    )) {
      throw new Error(
        `Unknown workspace section "${field.sectionId}" ` +
        `for field "${field.id}"`
      );
    }

    if (this.fields.has(field.id)) {
      throw new Error(
        `Payroll field "${field.id}" is already registered`
      );
    }

    this.fields.set(field.id, field);
    return field;
  }

  hasField(id) {
    return this.fields.has(id);
  }

  getField(id) {
    return this.fields.get(id) || null;
  }

  listFields() {
    return Object.freeze(
      [...this.fields.values()]
        .sort((left, right) => {
          if (left.sectionId !== right.sectionId) {
            const leftSection =
              this.workspaceRegistry.getSection(
                left.sectionId
              );

            const rightSection =
              this.workspaceRegistry.getSection(
                right.sectionId
              );

            return leftSection.order - rightSection.order;
          }

          return left.order - right.order;
        })
    );
  }

  listFieldsBySection(sectionId) {
    return Object.freeze(
      this.listFields().filter(
        (field) => field.sectionId === sectionId
      )
    );
  }

  createWorkspaceDefinition(options = {}) {
    const schema =
      this.workspaceRegistry.createWorkspaceSchema(
        options
      );

    return Object.freeze({
      ...schema,
      sections: Object.freeze(
        schema.sections.map((section) =>
          Object.freeze({
            ...section,
            fields: this.listFieldsBySection(
              section.id
            ),
          })
        )
      ),
      fieldCount: this.fields.size,
    });
  }
}

function createPayrollFieldRegistry(options = {}) {
  return new PayrollFieldRegistry(options);
}

module.exports = {
  PayrollFieldRegistry,
  createPayrollFieldRegistry,
};
