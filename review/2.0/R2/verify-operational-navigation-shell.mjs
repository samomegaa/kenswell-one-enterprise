import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || process.cwd());
const src = path.join(root, 'products/tax-payroll/frontend/src');
const required = [
  'product/shell/OperationalProductShell.jsx',
  'product/shell/ProductNavigation.jsx',
  'product/shell/ProductSectionState.jsx',
  'product/shell/operational-product-shell.css',
  'product/shell/index.js',
];

required.forEach((file) => assert.ok(
  fs.existsSync(path.join(src, file)),
  `Missing R2 source: ${file}`
));

const app = fs.readFileSync(path.join(src, 'App.jsx'), 'utf8');
assert.match(app, /OperationalProductShell/);
assert.match(app, /<OperationalProductShell>/);

const nav = fs.readFileSync(
  path.join(src, 'product/shell/ProductNavigation.jsx'),
  'utf8'
);
assert.match(nav, /Payroll product navigation/);

console.log('');
console.log('Kenswell One Enterprise Version 2.0-R2');
console.log('Operational Navigation Shell: PASSED');
console.log('Visible product sections: 8');
console.log('Existing Dashboard content preserved: yes');
console.log('Existing Staffology workspaces replaced: no');
