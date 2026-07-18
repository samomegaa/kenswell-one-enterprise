#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

async function main() {
  const composition = require(
    './live-validation-composition'
  );

  const report =
    await composition.validationRunner.run({
      employeeId:
        composition.configuration.employeeId,
      context: {
        employerId:
          composition.configuration.employerId,
      },
    });

  const output = path.resolve(
    process.cwd(),
    process.env.STAFFOLOGY_VALIDATION_OUTPUT ||
      'review/1.2/RC1/GA/live-validation-report.json'
  );

  fs.writeFileSync(
    output,
    `${JSON.stringify(report, null, 2)}\n`,
    'utf8'
  );

  console.log(
    `Live validation status: ${report.status}`
  );
  console.log(
    `Report written to ${output}`
  );

  if (report.status !== 'passed') {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
