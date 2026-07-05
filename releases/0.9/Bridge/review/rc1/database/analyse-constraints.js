const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');
const migrationsDir = path.join(root, 'src/database/migrations');

const relationshipPlan = [
  ['portal_accounts', 'client_id', 'clients', 'id'],
  ['portal_matters', 'client_id', 'clients', 'id'],
  ['portal_documents', 'client_id', 'clients', 'id'],
  ['portal_documents', 'matter_id', 'portal_matters', 'id'],
  ['portal_messages', 'client_id', 'clients', 'id'],
  ['portal_messages', 'matter_id', 'portal_matters', 'id'],
  ['notifications', 'client_id', 'clients', 'id'],
  ['file_assets', 'client_id', 'clients', 'id'],
  ['file_assets', 'matter_id', 'portal_matters', 'id'],
  ['file_assets', 'document_id', 'portal_documents', 'id'],
  ['client_tasks', 'client_id', 'clients', 'id'],
  ['client_tasks', 'matter_id', 'portal_matters', 'id'],
  ['client_approvals', 'client_id', 'clients', 'id'],
  ['client_approvals', 'matter_id', 'portal_matters', 'id'],
  ['client_approvals', 'document_id', 'portal_documents', 'id'],
];

const migrationText = fs.readdirSync(migrationsDir)
  .filter((file) => file.endsWith('.js'))
  .map((file) => fs.readFileSync(path.join(migrationsDir, file), 'utf8'))
  .join('\n');

const report = {
  generatedAt: new Date().toISOString(),
  plannedRelationships: relationshipPlan.length,
  warnings: [],
  relationships: [],
};

for (const [table, column, targetTable, targetColumn] of relationshipPlan) {
  const hasReference =
    migrationText.includes(`references`) &&
    migrationText.includes(targetTable) &&
    migrationText.includes(column);

  const item = {
    table,
    column,
    targetTable,
    targetColumn,
    hasReference,
  };

  report.relationships.push(item);

  if (!hasReference) {
    report.warnings.push({
      type: 'missing_foreign_key',
      table,
      column,
      target: `${targetTable}.${targetColumn}`,
    });
  }
}

fs.writeFileSync(
  path.join(__dirname, 'constraints-report.json'),
  JSON.stringify(report, null, 2)
);

console.log('Constraint analysis complete');
console.log(`Planned relationships: ${report.plannedRelationships}`);
console.log(`Warnings: ${report.warnings.length}`);

if (report.warnings.length) {
  console.log(JSON.stringify(report.warnings, null, 2));
}
