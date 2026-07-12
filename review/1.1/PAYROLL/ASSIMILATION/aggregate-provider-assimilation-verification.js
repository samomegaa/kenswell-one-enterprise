#!/usr/bin/env node

require('dotenv').config({
  path: '.env.local',
  quiet: true,
});

const path = require('path');
const {
  spawnSync,
} = require('child_process');

const ROOT = path.resolve(
  __dirname,
  '../../../..'
);

const suites = Object.freeze([
  Object.freeze({
    name: 'Enterprise Payroll Foundation',
    script:
      'review/1.1/PAYROLL/A/' +
      'aggregate-enterprise-payroll-verification.js',
  }),

  Object.freeze({
    name: 'Staffology Live Connection',
    script:
      'review/1.1/PAYROLL/LIVE/' +
      'verify-staffology-connection.js',
  }),

  Object.freeze({
    name: 'Employer Read Assimilation',
    script:
      'review/1.1/PAYROLL/ASSIMILATION/' +
      'verify-employer-read.js',
  }),

  Object.freeze({
    name: 'Employee Read Assimilation',
    script:
      'review/1.1/PAYROLL/ASSIMILATION/' +
      'verify-employee-read.js',
  }),

  Object.freeze({
    name: 'Pay Schedule Read Assimilation',
    script:
      'review/1.1/PAYROLL/ASSIMILATION/' +
      'verify-pay-schedule-read.js',
  }),
]);

function requireEnvironment(name) {
  const value =
    String(process.env[name] || '').trim();

  if (!value) {
    throw new Error(
      `${name} is required for live certification`
    );
  }

  return value;
}

function runSuite(suite) {
  const absoluteScript = path.join(
    ROOT,
    suite.script
  );

  console.log('');
  console.log(`▶ ${suite.name}`);
  console.log(`  ${suite.script}`);
  console.log('');

  const result = spawnSync(
    process.execPath,
    [absoluteScript],
    {
      cwd: ROOT,
      env: process.env,
      stdio: 'inherit',
    }
  );

  if (result.error) {
    return Object.freeze({
      ...suite,
      passed: false,
      error: result.error.message,
    });
  }

  return Object.freeze({
    ...suite,
    passed: result.status === 0,
    exitCode: result.status,
  });
}

function printHeader() {
  console.log(
    '=================================================='
  );

  console.log(
    'Generation Two — Kenswell Tax & Payroll'
  );

  console.log(
    'Enterprise Payroll Assimilation Certification'
  );

  console.log(
    '=================================================='
  );
}

function printSummary(results) {
  const passed = results.filter(
    (result) => result.passed
  );

  const failed = results.filter(
    (result) => !result.passed
  );

  console.log('');
  console.log(
    '--------------------------------------------------'
  );

  console.log(
    `Certification suites passed : ${passed.length}`
  );

  console.log(
    `Certification suites failed : ${failed.length}`
  );

  console.log(
    '--------------------------------------------------'
  );

  for (const result of results) {
    console.log(
      `${result.passed ? '✅' : '❌'} ${result.name}`
    );
  }

  return {
    passed,
    failed,
  };
}

function run() {
  printHeader();

  requireEnvironment(
    'STAFFOLOGY_API_KEY'
  );

  const results = suites.map(runSuite);

  const {
    passed,
    failed,
  } = printSummary(results);

  if (failed.length > 0) {
    console.error('');
    console.error(
      '❌ Enterprise Payroll Assimilation ' +
      'Certification failed'
    );

    process.exitCode = 1;
    return;
  }

  console.log('');
  console.log(
    '✅ Enterprise Payroll Assimilation ' +
    'Certification passed'
  );

  console.log('');
  console.log(
    'Certified capabilities:'
  );

  console.log(
    '  • Enterprise provider foundation'
  );

  console.log(
    '  • Live Staffology authentication'
  );

  console.log(
    '  • Employer listing and detail'
  );

  console.log(
    '  • Employee listing and detail'
  );

  console.log(
    '  • Pay schedule listing'
  );

  console.log(
    '  • Enterprise Payroll Manager orchestration'
  );

  console.log('');
  console.log(
    `Suites certified: ${passed.length}`
  );

  console.log(
    `Certified at: ${new Date().toISOString()}`
  );
}

try {
  run();
} catch (error) {
  console.error('');
  console.error(
    '❌ Enterprise Payroll Assimilation ' +
    'Certification could not start'
  );

  console.error(error.message);
  process.exit(1);
}
