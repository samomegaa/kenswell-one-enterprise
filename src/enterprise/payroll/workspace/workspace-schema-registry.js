'use strict';

const { WORKSPACE_SECTIONS } = require('./workspace-sections');

class WorkspaceSchemaRegistry {
  constructor(sections = WORKSPACE_SECTIONS) {
    this.sections = new Map();
    sections.forEach((section) => this.registerSection(section));
  }

  registerSection(section) {
    if (!section || typeof section !== 'object') {
      throw new TypeError('Workspace section must be an object');
    }

    const id = String(section.id || '').trim();
    if (!id) throw new TypeError('Workspace section id is required');
    if (this.sections.has(id)) {
      throw new Error(`Workspace section "${id}" is already registered`);
    }

    const normalised = Object.freeze({
      id,
      title: String(section.title || id),
      order: Number(section.order || 0),
      icon: section.icon || null,
      description: section.description || '',
      readiness: Object.freeze([...(section.readiness || [])]),
      visibleWhen: section.visibleWhen || null,
      metadata: Object.freeze({ ...(section.metadata || {}) }),
    });

    this.sections.set(id, normalised);
    return normalised;
  }

  hasSection(id) { return this.sections.has(id); }
  getSection(id) { return this.sections.get(id) || null; }

  listSections() {
    return Object.freeze([...this.sections.values()].sort((a, b) => a.order - b.order));
  }

  createWorkspaceSchema({
    id = 'canonical-payroll-employee',
    title = 'Canonical Payroll Workspace',
    version = '1.0.0',
    metadata = {},
  } = {}) {
    return Object.freeze({
      id,
      title,
      version,
      sections: this.listSections(),
      metadata: Object.freeze({
        sourceContract: 'staffology-native-employee',
        providerNeutralPresentation: true,
        ...metadata,
      }),
    });
  }
}

function createWorkspaceSchemaRegistry(options = {}) {
  return new WorkspaceSchemaRegistry(options.sections || WORKSPACE_SECTIONS);
}

module.exports = { WorkspaceSchemaRegistry, createWorkspaceSchemaRegistry };
