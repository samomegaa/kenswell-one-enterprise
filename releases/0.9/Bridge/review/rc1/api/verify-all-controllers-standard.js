const fs = require('fs');
const path = require('path');

const controllersDir = path.resolve(
  __dirname,
  '../../../src/controllers/clientPortal'
);

const files = fs.readdirSync(controllersDir)
  .filter((file) => file.endsWith('Controller.js'));

const failures = [];

for (const file of files) {
  const full = path.join(controllersDir, file);
  const content = fs.readFileSync(full, 'utf8');

  if (!content.includes("require('../../http')")) {
    failures.push(`${file}: missing http respond import`);
  }

  if (!content.includes('respond.success') && !content.includes('respond.created')) {
    failures.push(`${file}: missing respond success/created usage`);
  }

  if (!content.includes('respond.failure')) {
    failures.push(`${file}: missing respond failure usage`);
  }

  if (content.includes('res.json(') || content.includes('res.status(400).json') || content.includes('res.status(201).json')) {
    failures.push(`${file}: contains raw response JSON usage`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`All client portal controllers standardised: ${files.length}`);
