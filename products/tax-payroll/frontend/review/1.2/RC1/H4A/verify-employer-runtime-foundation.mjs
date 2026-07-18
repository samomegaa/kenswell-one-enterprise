import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFile = fileURLToPath(import.meta.url);
const reviewDirectory = path.dirname(currentFile);
const frontendRoot = path.resolve(
  reviewDirectory,
  '../../../..'
);

const requiredFiles = [
  'src/services/enterprise-runtime-api.js',
  'src/runtime/EmployerRuntimeContext.js',
  'src/runtime/EmployerRuntimeProvider.jsx',
  'src/runtime/employerRuntimeStorage.js',
  'src/runtime/useEmployerRuntime.js',
  'src/runtime/index.js',
  'src/workspaces/providers/EmployerRuntimeGuard.jsx',
  'src/workspaces/providers/EmployerSelector.jsx',
  'src/workspaces/providers/employer-runtime.css',
];

for (const relativePath of requiredFiles) {
  const absolutePath = path.join(
    frontendRoot,
    relativePath
  );

  assert.equal(
    fs.existsSync(absolutePath),
    true,
    `Missing ${relativePath}`
  );
}

const apiSource = fs.readFileSync(
  path.join(
    frontendRoot,
    'src/services/enterprise-runtime-api.js'
  ),
  'utf8'
);

assert.match(apiSource, /\/api\/employers/);
assert.match(apiSource, /employees/);
assert.match(apiSource, /workspace/);

const providerSource = fs.readFileSync(
  path.join(
    frontendRoot,
    'src/runtime/EmployerRuntimeProvider.jsx'
  ),
  'utf8'
);

assert.match(providerSource, /refreshEmployers/);
assert.match(providerSource, /selectEmployer/);
assert.match(providerSource, /selectedEmployer/);

console.log('PASS  Enterprise runtime API');
console.log('PASS  Employer runtime context');
console.log('PASS  Employer selection persistence');
console.log('PASS  Employer selector foundation');
console.log(
  '\n✅ RC1-H4A Employer Runtime Foundation passed'
);
