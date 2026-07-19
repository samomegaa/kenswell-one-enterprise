'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(
  __dirname,
  '../../../..'
);

const searchRoots = [
  path.join(root, 'apps', 'api'),
  path.join(root, 'src'),
  path.join(root, 'products'),
];

const ignored = new Set([
  'node_modules',
  'dist',
  '.git',
  'coverage',
]);

const sourceExtensions = new Set([
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.ts',
  '.tsx',
]);

const endpointPattern =
  /(['"`])([^'"`\n]*(?:employer|employee|staffology|workspace)[^'"`\n]*)\1/gi;

const findings = [];

function walk(directory) {
  if (!fs.existsSync(directory)) {
    return;
  }

  for (const entry of fs.readdirSync(
    directory,
    { withFileTypes: true }
  )) {
    if (ignored.has(entry.name)) {
      continue;
    }

    const absolutePath = path.join(
      directory,
      entry.name
    );

    if (entry.isDirectory()) {
      walk(absolutePath);
      continue;
    }

    if (!sourceExtensions.has(
      path.extname(entry.name)
    )) {
      continue;
    }

    inspect(absolutePath);
  }
}

function inspect(absolutePath) {
  const source = fs.readFileSync(
    absolutePath,
    'utf8'
  );

  const relativePath = path.relative(
    root,
    absolutePath
  );

  const matches = [];

  for (const match of source.matchAll(
    endpointPattern
  )) {
    const value = match[2].trim();

    if (
      value.length < 3 ||
      value.length > 240
    ) {
      continue;
    }

    matches.push(value);
  }

  if (
    /staffology/i.test(source) ||
    matches.length > 0
  ) {
    findings.push({
      file: relativePath,
      mentionsStaffology:
        /staffology/i.test(source),
      possibleContracts: [
        ...new Set(matches),
      ],
    });
  }
}

for (const directory of searchRoots) {
  walk(directory);
}

findings.sort(
  (left, right) =>
    left.file.localeCompare(right.file)
);

const outputPath = path.join(
  __dirname,
  'staffology-runtime-inventory.json'
);

fs.writeFileSync(
  outputPath,
  JSON.stringify(
    {
      generatedAt:
        new Date().toISOString(),
      files: findings,
    },
    null,
    2
  ) + '\n'
);

console.log(
  `Staffology runtime files: ${findings.length}`
);

console.log(
  `Inventory written to ${path.relative(
    root,
    outputPath
  )}`
);
