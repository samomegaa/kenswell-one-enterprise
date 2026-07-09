const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

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

const reviewFiles = walk(path.join(ROOT, 'review/1.0'));

const oversized = reviewFiles.filter((file) => {
  const lines = fs.readFileSync(file, 'utf8').split('\n').length;
  return lines > 250;
});

assert(
  oversized.length === 0,
  `Oversized verification scripts found:\n${oversized
    .map((file) => path.relative(ROOT, file))
    .join('\n')}`
);

console.log(`Verification scripts checked : ${reviewFiles.length}`);
console.log(`Oversized scripts            : ${oversized.length}`);
console.log('✅ GA-H-D Part 1 — Verification script standards verified');
