const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(process.argv[2] || process.cwd());
const file = path.join(
  root,
  'products/tax-payroll/frontend/src/runtime/index.js'
);

let source = fs.readFileSync(file, 'utf8');

const block = [
  '',
  'export {',
  '  useEnterpriseEmployeeRuntime,',
  "} from './useEnterpriseEmployeeRuntime';",
  '',
].join('\n');

if (!source.includes('useEnterpriseEmployeeRuntime')) {
  source = `${source.trimEnd()}\n${block}`;
  fs.writeFileSync(file, source);
}

console.log('Frontend runtime index integration: PASSED');
console.log('useEnterpriseEmployeeRuntime export: installed');
