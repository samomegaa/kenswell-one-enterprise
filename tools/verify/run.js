'use strict';

const path = require('path');

const {
  resolveModules,
} = require('./registry');

const {
  fail,
} = require('./shared/result');

const root = path.resolve(
  __dirname,
  '../..'
);

const requested = process.argv.slice(2);

let entries;

try {
  entries = resolveModules(requested);
} catch (error) {
  console.error(`FAIL ${error.message}`);
  process.exit(1);
}

const results = entries.map(
  ([name, verifier]) => {
    try {
      return verifier(root);
    } catch (error) {
      return fail(name, error);
    }
  }
);

results.forEach((result) => {
  if (result.passed) {
    const details = result.details
      ? ` — ${result.details}`
      : '';

    console.log(
      `PASS ${result.name}${details}`
    );

    return;
  }

  console.error(
    `FAIL ${result.name} — ` +
    result.error.message
  );
});

const failed = results.filter(
  (result) => !result.passed
);

console.log(
  `${results.length - failed.length}/` +
  `${results.length} verification modules passed`
);

if (failed.length) {
  process.exit(1);
}
