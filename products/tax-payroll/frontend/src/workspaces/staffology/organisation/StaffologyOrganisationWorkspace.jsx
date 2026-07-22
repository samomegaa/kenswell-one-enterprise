import { useState } from 'react';
import PropTypes from 'prop-types';

import StaffologyWorkspaceState
  from '../StaffologyWorkspaceState';

import {
  adaptStaffologyOrganisation,
} from './adaptStaffologyOrganisation';

import {
  createOrganisationPresentationModel,
} from './organisationPresentationModel';

import OrganisationSummaryCard
  from './OrganisationSummaryCard';

import OrganisationDetailsSection
  from './OrganisationDetailsSection';

import {
  StaffologyDepartmentsWorkspace,
} from './departments';

import {
  StaffologyCostCentresWorkspace,
} from './cost-centres';

import {
  StaffologyPayrollCalendarWorkspace,
} from './payroll-calendar';

import './organisation.css';

const TABS = Object.freeze([
  {
    id: 'overview',
    label: 'Overview',
  },
  {
    id: 'departments',
    label: 'Departments',
  },
  {
    id: 'cost-centres',
    label: 'Cost Centres',
  },
  {
    id: 'payroll-calendar',
    label: 'Payroll Calendar',
  },
]);

export default function StaffologyOrganisationWorkspace({
  employer,
  onBack,
}) {
  const [activeTab, setActiveTab] =
    useState('overview');

  const model =
    createOrganisationPresentationModel(
      adaptStaffologyOrganisation(employer)
    );

  if (!model.available) {
    return (
      <main className="staffology-organisation-workspace">
        <button
          type="button"
          onClick={onBack}
          className="organisation-back-button"
        >
          Back to employees
        </button>

        <StaffologyWorkspaceState
          title="Organisation unavailable"
          message={
            'Organisation information is not present in the current Staffology employer response.'
          }
        />
      </main>
    );
  }

  let content;

  if (activeTab === 'departments') {
    content = (
      <StaffologyDepartmentsWorkspace
        employer={employer}
      />
    );
  } else if (activeTab === 'cost-centres') {
    content = (
      <StaffologyCostCentresWorkspace
        employer={employer}
      />
    );
  } else if (
    activeTab === 'payroll-calendar'
  ) {
    content = (
      <StaffologyPayrollCalendarWorkspace
        employer={employer}
      />
    );
  } else {
    content = (
      <>
        <OrganisationDetailsSection
          title="Organisation identity"
          fields={model.identity}
        />

        <OrganisationDetailsSection
          title="Payroll configuration"
          fields={model.payroll}
        />

        <OrganisationDetailsSection
          title="Administration"
          fields={model.administration}
        />
      </>
    );
  }

  const selectedTab =
    TABS.find((tab) => tab.id === activeTab);

  return (
    <main className="staffology-organisation-workspace">
      <div className="organisation-toolbar">
        <button
          type="button"
          onClick={onBack}
          className="organisation-back-button"
        >
          Back to employees
        </button>
      </div>

      <OrganisationSummaryCard model={model} />

      <nav
        className="organisation-navigation"
        aria-label="Organisation sections"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            aria-current={
              activeTab === tab.id
                ? 'page'
                : undefined
            }
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <p
        className="organisation-sr-only"
        role="status"
        aria-live="polite"
      >
        {selectedTab?.label} section selected.
      </p>

      {content}
    </main>
  );
}

StaffologyOrganisationWorkspace.propTypes = {
  employer: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
};
