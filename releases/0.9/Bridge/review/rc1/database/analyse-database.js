const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');
const migrationsDir = path.join(root, 'src/database/migrations');
const modelsDir = path.join(root, 'src/database/models');

function listFiles(dir, suffix = '.js') {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith(suffix)).sort();
}

const migrations = listFiles(migrationsDir);
const models = listFiles(modelsDir).filter((file) => file !== 'index.js');

const report = {
  generatedAt: new Date().toISOString(),
  migrationCount: migrations.length,
  modelCount: models.length,
  migrations,
  models,
  warnings: [],
};

const modelIndex = fs.existsSync(path.join(modelsDir, 'index.js'))
  ? fs.readFileSync(path.join(modelsDir, 'index.js'), 'utf8')
  : '';

for (const model of models) {
  const modelName = model.replace('.js', '');

  if (!modelIndex.includes(`./${modelName}`) && !modelIndex.includes(`'${modelName}'`) && !modelIndex.includes(`"${modelName}"`)) {
    report.warnings.push({
      type: 'model_registration',
      message: `${modelName} may not be registered in src/database/models/index.js`,
    });
  }
}

for (const migration of migrations) {
  const full = path.join(migrationsDir, migration);
  const content = fs.readFileSync(full, 'utf8');

  if (!content.includes('createTable')) {
    report.warnings.push({
      type: 'migration_structure',
      migration,
      message: 'Migration does not appear to create a table',
    });
  }

  if (!content.includes('addIndex')) {
    report.warnings.push({
      type: 'indexes',
      migration,
      message: 'Migration has no indexes',
    });
  }

  if (!content.includes('dropTable')) {
    report.warnings.push({
      type: 'rollback',
      migration,
      message: 'Migration has no dropTable rollback',
    });
  }
}

const modelNames = models.map((file) => file.replace('.js', ''));
const expectedTables = [
  'clients',
  'portal_accounts',
  'portal_matters',
  'portal_documents',
  'portal_messages',
  'audit_logs',
  'notifications',
  'file_assets',
  'client_tasks',
  'client_approvals',
];

for (const table of expectedTables) {
  const found = migrations.some((migration) => {
    const content = fs.readFileSync(path.join(migrationsDir, migration), 'utf8');
    return content.includes(`'${table}'`) || content.includes(`"${table}"`);
  });

  if (!found) {
    report.warnings.push({
      type: 'missing_table_migration',
      table,
      message: `Expected table ${table} was not found in migrations`,
    });
  }
}

fs.writeFileSync(
  path.join(__dirname, 'database-report.json'),
  JSON.stringify(report, null, 2)
);

console.log('Database analysis complete');
console.log(`Migrations: ${report.migrationCount}`);
console.log(`Models: ${report.modelCount}`);
console.log(`Warnings: ${report.warnings.length}`);
if (report.warnings.length) {
  console.log(JSON.stringify(report.warnings, null, 2));
}
