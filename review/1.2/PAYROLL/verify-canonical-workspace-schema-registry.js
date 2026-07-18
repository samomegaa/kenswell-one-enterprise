#!/usr/bin/env node
'use strict';

const assert = require('assert');
const {
  WORKSPACE_SECTION_IDS,
  WORKSPACE_SECTIONS,
  WorkspaceSchemaRegistry,
  createWorkspaceSchemaRegistry,
} = require('../../../src/enterprise/payroll/workspace');

console.log('Canonical Payroll Workspace Schema Registry');
console.log();

assert.strictEqual(WORKSPACE_SECTIONS.length, 12);
console.log('PASS  Twelve canonical workspace sections');

assert.strictEqual(WORKSPACE_SECTIONS[0].id, WORKSPACE_SECTION_IDS.PERSONAL);
assert.strictEqual(WORKSPACE_SECTIONS.at(-1).id, WORKSPACE_SECTION_IDS.PROVIDER);
console.log('PASS  Stable canonical ordering');

const registry = createWorkspaceSchemaRegistry();
assert(registry instanceof WorkspaceSchemaRegistry);
assert(registry.hasSection('tax-ni'));
assert(registry.hasSection('rti'));
console.log('PASS  Workspace section registration');

const sections = registry.listSections();
assert(Object.isFrozen(sections));
assert(sections.every((section) => Object.isFrozen(section)));
console.log('PASS  Immutable workspace metadata');

const schema = registry.createWorkspaceSchema();
assert.strictEqual(schema.metadata.sourceContract, 'staffology-native-employee');
assert.strictEqual(schema.metadata.providerNeutralPresentation, true);
assert.strictEqual(schema.sections.length, 12);
console.log('PASS  Canonical workspace schema creation');

assert.throws(
  () => registry.registerSection({ id: 'personal', title: 'Duplicate' }),
  /already registered/
);
console.log('PASS  Duplicate section protection');

console.log();
console.log('✅ Canonical Payroll Workspace Schema Registry passed');
