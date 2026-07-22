const fs = require("fs");
const path = require("path");

const dashboardDir = path.join(
  process.cwd(),
  "products/tax-payroll/frontend/src/workspaces/staffology/organisation/dashboard"
);

const source = fs.readdirSync(dashboardDir)
  .filter((name) => /\.(js|jsx)$/.test(name))
  .map((name) => fs.readFileSync(path.join(dashboardDir, name), "utf8"))
  .join("\n");

const requiredTerms = [
  "Unavailable",
  "unavailable",
  "available",
  "contracts",
];

for (const term of requiredTerms) {
  if (!source.includes(term)) {
    throw new Error(`Dashboard unavailable-state contract missing: ${term}`);
  }
}

const suspiciousPatterns = [
  /unavailable[^;\n]{0,80}\?\s*0\b/i,
  /\|\|\s*0\b[^;\n]{0,80}unavailable/i,
];

for (const pattern of suspiciousPatterns) {
  if (pattern.test(source)) {
    throw new Error(
      "Unavailable dashboard data appears to be coerced into zero"
    );
  }
}

console.log("Staffology unavailable-state verification passed");
