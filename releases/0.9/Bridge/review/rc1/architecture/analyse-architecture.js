const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../..');

const targets = [
  'src',
  'apps/client-portal/src',
];

const ignored = new Set(['node_modules', 'dist', '.git']);

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir)) {
    if (ignored.has(entry)) continue;

    const full = path.join(dir, entry);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      walk(full, files);
    } else if (/\.(js|jsx)$/.test(entry)) {
      files.push(full);
    }
  }

  return files;
}

function extractRequires(content) {
  const requireMatches = [...content.matchAll(/require\(['"`]([^'"`]+)['"`]\)/g)].map((m) => m[1]);
  const importMatches = [...content.matchAll(/import\s+.*?\s+from\s+['"`]([^'"`]+)['"`]/g)].map((m) => m[1]);

  return [...requireMatches, ...importMatches];
}

function layerOf(file) {
  const normalised = file.replaceAll(path.sep, '/');

  if (normalised.includes('/controllers/')) return 'controllers';
  if (normalised.includes('/routes/')) return 'routes';
  if (normalised.includes('/services/')) return 'services';
  if (normalised.includes('/repositories/')) return 'repositories';
  if (normalised.includes('/database/models/')) return 'models';
  if (normalised.includes('/database/migrations/')) return 'migrations';
  if (normalised.includes('/auth/')) return 'auth';
  if (normalised.includes('/middleware/')) return 'middleware';
  if (normalised.includes('/validation/')) return 'validation';
  if (normalised.includes('/audit/')) return 'audit';
  if (normalised.includes('/notifications/')) return 'notifications';
  if (normalised.includes('/files/')) return 'files';
  if (normalised.includes('/tasks/')) return 'tasks';
  if (normalised.includes('/approvals/')) return 'approvals';
  if (normalised.includes('/timeline/')) return 'timeline';
  if (normalised.includes('/activity/')) return 'activity';
  if (normalised.includes('/dashboard/')) return 'dashboard';
  if (normalised.includes('/apps/client-portal/src/')) return 'frontend';

  return 'other';
}

const allFiles = targets.flatMap((target) => walk(path.join(ROOT, target)));

const report = {
  generatedAt: new Date().toISOString(),
  totalFiles: allFiles.length,
  layers: {},
  imports: [],
  warnings: [],
};

for (const file of allFiles) {
  const rel = path.relative(ROOT, file).replaceAll(path.sep, '/');
  const content = fs.readFileSync(file, 'utf8');
  const layer = layerOf(file);

  report.layers[layer] = (report.layers[layer] || 0) + 1;

  const imports = extractRequires(content);

  for (const source of imports) {
    report.imports.push({
      file: rel,
      layer,
      source,
    });

    if (source.includes('/controllers') && layer !== 'routes') {
      report.warnings.push({
        file: rel,
        warning: 'Controller imported outside routes layer',
        source,
      });
    }

    if (source.includes('/database/models') && !['repositories', 'other'].includes(layer)) {
      report.warnings.push({
        file: rel,
        warning: 'Model imported outside repository layer',
        source,
      });
    }
  }
}

fs.writeFileSync(
  path.join(__dirname, 'architecture-report.json'),
  JSON.stringify(report, null, 2)
);

console.log('Architecture analysis complete');
console.log(`Files analysed: ${report.totalFiles}`);
console.log(`Warnings: ${report.warnings.length}`);
console.log(report.layers);
