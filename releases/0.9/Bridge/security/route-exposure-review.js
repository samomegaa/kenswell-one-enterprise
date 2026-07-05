const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const routesDir = path.join(root, 'src/routes/clientPortal');

const files = fs.readdirSync(routesDir)
  .filter((file) => file.endsWith('.routes.js'))
  .sort();

const report = {
  generatedAt: new Date().toISOString(),
  files: [],
  warnings: [],
};

for (const file of files) {
  const full = path.join(routesDir, file);
  const content = fs.readFileSync(full, 'utf8');

  const hasRouter = content.includes('express.Router') || content.includes('Router()');
  const hasValidation = content.includes('validate') || content.includes('Schema');
  const hasController = content.includes('Controller') || content.includes('controller');

  report.files.push({
    file,
    hasRouter,
    hasValidation,
    hasController,
  });

  if (!hasRouter) {
    report.warnings.push({ file, warning: 'Route file may not define an Express router' });
  }

  if (!hasController) {
    report.warnings.push({ file, warning: 'Route file may not reference a controller' });
  }
}

const outDir = path.join(root, 'security/results');
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(
  path.join(outDir, 'route-exposure-review.json'),
  JSON.stringify(report, null, 2)
);

console.log('Route exposure review complete');
console.log(`Route files reviewed: ${report.files.length}`);
console.log(`Warnings: ${report.warnings.length}`);

if (report.warnings.length) {
  console.log(JSON.stringify(report.warnings, null, 2));
}
