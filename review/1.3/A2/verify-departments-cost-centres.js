'use strict';
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const root = path.resolve(__dirname, '../../../');
const base = path.join(root, 'products/tax-payroll/frontend/src/workspaces/staffology/organisation');
const required = [
  'organisationCollectionResolver.js', 'departments/index.js', 'departments/departmentFields.js',
  'departments/departmentResolver.js', 'departments/adaptStaffologyDepartments.js',
  'departments/departmentPresentation.js', 'departments/departmentPresentationModel.js',
  'departments/DepartmentCard.jsx', 'departments/StaffologyDepartmentsWorkspace.jsx',
  'departments/departments.css', 'cost-centres/index.js', 'cost-centres/costCentreFields.js',
  'cost-centres/costCentreResolver.js', 'cost-centres/adaptStaffologyCostCentres.js',
  'cost-centres/costCentrePresentation.js', 'cost-centres/costCentrePresentationModel.js',
  'cost-centres/CostCentreCard.jsx', 'cost-centres/StaffologyCostCentresWorkspace.jsx',
  'cost-centres/cost-centres.css',
];
required.forEach((file) => assert.ok(fs.existsSync(path.join(base, file)), `Missing A2 file: ${file}`));
const workspace = fs.readFileSync(path.join(base, 'StaffologyOrganisationWorkspace.jsx'), 'utf8');
['StaffologyDepartmentsWorkspace', 'StaffologyCostCentresWorkspace', "id: 'departments'", "id: 'cost-centres'"].forEach((token) => assert.ok(workspace.includes(token), `Missing organisation integration token: ${token}`));
console.log('Departments & Cost Centres verification passed');
