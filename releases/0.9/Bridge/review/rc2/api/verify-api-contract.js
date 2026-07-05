const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');

const required = [
  'docs/api/API-CONTRACT.md',
  'docs/api/ENDPOINT-INVENTORY.md',
  'review/rc2/api/API-CONTRACT-REVIEW.md',
  'review/rc2/api/endpoint-inventory.json',
];

for (const file of required) {
  const full = path.join(root, file);

  if (!fs.existsSync(full)) {
    throw new Error(`Missing API contract file: ${file}`);
  }

  if (!fs.readFileSync(full, 'utf8').trim()) {
    throw new Error(`API contract file is empty: ${file}`);
  }
}

const inventory = JSON.parse(
  fs.readFileSync(path.join(root, 'review/rc2/api/endpoint-inventory.json'), 'utf8')
);

if (!inventory.total || inventory.total < 10) {
  throw new Error('Endpoint inventory appears incomplete');
}

console.log('API contract documentation verified');
console.log(`Endpoint inventory total: ${inventory.total}`);
