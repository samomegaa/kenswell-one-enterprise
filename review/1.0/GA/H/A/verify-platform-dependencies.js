const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const ENTERPRISE = path.join(ROOT, 'src/enterprise');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return walk(full);
    }

    return full.endsWith('.js') ? [full] : [];
  });
}

const forbidden = [
  {
    service: 'repository',
    pattern: "require('../scheduler",
  },
  {
    service: 'repository',
    pattern: "require('../notification",
  },
  {
    service: 'scheduler',
    pattern: "require('../ai",
  },
  {
    service: 'notification',
    pattern: "require('../ai",
  },
  {
    service: 'search',
    pattern: "require('../ai",
  },
  {
    service: 'integration',
    pattern: "require('../ai",
  },
];

const violations = [];

for (const rule of forbidden) {
  const dir = path.join(ENTERPRISE, rule.service);
  const files = walk(dir);

  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8');

    if (source.includes(rule.pattern)) {
      violations.push({
        service: rule.service,
        file: path.relative(ROOT, file),
        pattern: rule.pattern,
      });
    }
  }
}

assert(
  violations.length === 0,
  `Forbidden platform dependencies found:\n${violations
    .map((v) => `${v.file} -> ${v.pattern}`)
    .join('\n')}`
);

console.log(`Dependency rules checked : ${forbidden.length}`);
console.log(`Violations found         : ${violations.length}`);
console.log('✅ GA-H-A Part 4 — Architecture Dependency Review verified');
