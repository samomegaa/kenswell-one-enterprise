const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function listFiles(relativePath) {
  const fullPath = path.join(ROOT, relativePath);

  if (!fs.existsSync(fullPath)) {
    return [];
  }

  return fs
    .readdirSync(fullPath)
    .filter((file) => file.endsWith('.js'))
    .sort();
}

const RESPONSIBILITY_MARKERS = {
  api: ['api-boundary.js', 'api-controller.js', 'api-request.js', 'api-response.js'],
  application: ['application-service.js', 'application-use-case.js'],
  audit: ['audit-context.js', 'activity-trail.js', 'audit-provider.js'],
  context: ['enterprise-context.js', 'context-resolver.js', 'context-middleware.js'],
  cqrs: ['command.js', 'command-bus.js', 'query.js', 'query-bus.js'],
  domain: ['domain-service.js', 'domain-operation.js', 'domain-result.js'],
  logging: ['logger.js', 'log-entry.js', 'correlation.js'],
  observability: ['metrics-registry.js', 'tracer.js', 'health-signals.js'],
  policy: ['validation-boundary.js', 'policy-boundary.js', 'policy-rule.js'],
  resilience: ['idempotency-boundary.js', 'retry-boundary.js', 'retry-policy.js'],
  security: ['security-headers.js', 'runtime-guard.js', 'request-guard.js'],
  transactions: ['transaction-boundary.js', 'transaction-manager.js', 'outbox.js'],
  workflow: ['workflow.js', 'workflow-context.js', 'unit-of-work.js'],
};

const results = [];

for (const [layer, requiredFiles] of Object.entries(RESPONSIBILITY_MARKERS)) {
  const files = listFiles(`src/enterprise/${layer}`);

  const missing = requiredFiles.filter((file) => {
    return !files.includes(file);
  });

  assert(
    missing.length === 0,
    `Layer ${layer} missing responsibility files: ${missing.join(', ')}`
  );

  results.push({
    layer,
    responsibilityFiles: requiredFiles.length,
    missing: missing.length,
  });
}

console.log('Enterprise layers checked :', results.length);

for (const result of results) {
  console.log(
    `${result.layer.padEnd(16)} responsibility-files=${result.responsibilityFiles}`
  );
}

console.log('✅ RC1-B Part 4 — Enterprise layer responsibilities verified');
