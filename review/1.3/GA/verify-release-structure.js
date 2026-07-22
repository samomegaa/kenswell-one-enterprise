const fs = require("fs");
const path = require("path");

const root = process.cwd();
const required = [
  "products/tax-payroll/frontend/src/workspaces/staffology/organisation",
  "products/tax-payroll/frontend/src/workspaces/staffology/organisation/dashboard",
  "review/1.3/A5",
  "review/1.3/GA",
  "review/1.3/GA/README.md",
  "review/1.3/GA/VERSION-1.3-MANIFEST.md",
];

for (const relativePath of required) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Missing Version 1.3 GA path: ${relativePath}`);
  }
}

console.log("Version 1.3 GA release structure verification passed");
