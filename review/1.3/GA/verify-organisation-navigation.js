const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "products/tax-payroll/frontend/src/workspaces/staffology/organisation",
  "StaffologyOrganisationWorkspace.jsx"
);
const source = fs.readFileSync(file, "utf8");

const labels = [
  "Dashboard",
  "Overview",
  "Departments",
  "Cost Centres",
  "Payroll Calendar",
  "Pay Elements",
];

for (const label of labels) {
  if (!source.includes(label)) {
    throw new Error(`Missing organisation navigation label: ${label}`);
  }
}

const dashboardPosition = source.indexOf("Dashboard");
const overviewPosition = source.indexOf("Overview");

if (dashboardPosition < 0 || overviewPosition < 0 ||
    dashboardPosition > overviewPosition) {
  throw new Error("Dashboard must precede Overview in organisation navigation");
}

if (!/useState\s*\(\s*["'`]dashboard["'`]\s*\)/i.test(source) &&
    !/(default|initial|active)[A-Za-z]*\s*[:=]\s*["'`]dashboard["'`]/i.test(source)) {
  throw new Error("Dashboard is not clearly configured as the default tab");
}

console.log("Staffology organisation navigation verification passed");
