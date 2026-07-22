const fs = require("fs");
const path = require("path");

const root = process.cwd();
const organisation = path.join(
  root,
  "products/tax-payroll/frontend/src/workspaces/staffology/organisation"
);

const required = [
  "StaffologyOrganisationWorkspace.jsx",
  "index.js",
  "dashboard/index.js",
  "dashboard/StaffologyOrganisationDashboard.jsx",
  "dashboard/dashboardResolver.js",
  "dashboard/adaptStaffologyOrganisationDashboard.js",
  "dashboard/dashboardPresentationModel.js",
];

for (const file of required) {
  if (!fs.existsSync(path.join(organisation, file))) {
    throw new Error(`Missing organisation module: ${file}`);
  }
}

const organisationIndex = fs.readFileSync(
  path.join(organisation, "index.js"),
  "utf8"
);
const dashboardIndex = fs.readFileSync(
  path.join(organisation, "dashboard/index.js"),
  "utf8"
);

if (!/dashboard/i.test(organisationIndex)) {
  throw new Error("Organisation index does not expose the dashboard module");
}

if (!/StaffologyOrganisationDashboard/.test(dashboardIndex)) {
  throw new Error("Dashboard index does not export StaffologyOrganisationDashboard");
}

console.log("Staffology organisation export verification passed");
