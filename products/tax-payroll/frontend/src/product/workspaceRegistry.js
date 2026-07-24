import {
  PRODUCT_SECTION_IDS,
} from './productSections.js';

import {
  STAFFOLOGY_CAPABILITIES,
  WORKSPACE_AVAILABILITY,
} from './providerCapabilities.js';

const workspace = (
  id,
  sectionId,
  label,
  capability,
  availability,
  source
) => Object.freeze({
  id,
  sectionId,
  label,
  provider: 'staffology',
  capability,
  availability,
  source,
});

export const OPERATIONAL_WORKSPACES = Object.freeze([
  workspace('dashboard', PRODUCT_SECTION_IDS.DASHBOARD, 'Dashboard',
    STAFFOLOGY_CAPABILITIES.EMPLOYERS_READ,
    WORKSPACE_AVAILABILITY.FOUNDATION, null),
  workspace('payroll-run', PRODUCT_SECTION_IDS.PAYROLL, 'Payroll Run',
    STAFFOLOGY_CAPABILITIES.PAYRUN_READ,
    WORKSPACE_AVAILABILITY.AVAILABLE,
    'workspaces/staffology/payroll-run/StaffologyPayrollRunWorkspace.jsx'),
  workspace('rti', PRODUCT_SECTION_IDS.RTI, 'RTI',
    STAFFOLOGY_CAPABILITIES.RTI_READ,
    WORKSPACE_AVAILABILITY.PLANNED, null),
  workspace('employees', PRODUCT_SECTION_IDS.EMPLOYEES, 'Employees',
    STAFFOLOGY_CAPABILITIES.EMPLOYEES_READ,
    WORKSPACE_AVAILABILITY.AVAILABLE,
    'workspaces/staffology/StaffologyEmployeeWorkspace.jsx'),
  workspace('hmrc', PRODUCT_SECTION_IDS.HMRC, 'HMRC',
    STAFFOLOGY_CAPABILITIES.HMRC_READ,
    WORKSPACE_AVAILABILITY.PLANNED, null),
  workspace('pensions', PRODUCT_SECTION_IDS.PENSIONS, 'Pensions',
    STAFFOLOGY_CAPABILITIES.PENSIONS_READ,
    WORKSPACE_AVAILABILITY.FOUNDATION,
    'workspaces/staffology/pension/StaffologyPensionPanel.jsx'),
  workspace('reports', PRODUCT_SECTION_IDS.REPORTS, 'Reports',
    STAFFOLOGY_CAPABILITIES.REPORTS_READ,
    WORKSPACE_AVAILABILITY.PLANNED, null),
  workspace('organisation', PRODUCT_SECTION_IDS.ORGANISATION, 'Organisation',
    STAFFOLOGY_CAPABILITIES.ORGANISATION_READ,
    WORKSPACE_AVAILABILITY.AVAILABLE,
    'workspaces/staffology/organisation/StaffologyOrganisationWorkspace.jsx'),
]);
