import PropTypes from 'prop-types';

import StaffologyWorkspaceState
  from '../../StaffologyWorkspaceState';

import {
  adaptStaffologyOrganisationDashboard,
} from './adaptStaffologyOrganisationDashboard';

import {
  createDashboardPresentationModel,
} from './dashboardPresentationModel';

import DashboardMetricCard
  from './DashboardMetricCard';

import DashboardStatusPanel
  from './DashboardStatusPanel';

import UnavailableContractsPanel
  from './UnavailableContractsPanel';

import './dashboard.css';

export default function StaffologyOrganisationDashboard({
  employer,
}) {
  const model = createDashboardPresentationModel(
    adaptStaffologyOrganisationDashboard(employer)
  );

  if (!model.available) {
    return (
      <StaffologyWorkspaceState
        title="Organisation dashboard unavailable"
        message={
          'Organisation dashboard information is not present in the current Staffology employer response.'
        }
      />
    );
  }

  return (
    <section className="organisation-dashboard">
      <header className="organisation-dashboard__header">
        <div>
          <h2>Organisation Dashboard</h2>
          <p>
            Executive read-only summary of the current
            Staffology organisation runtime.
          </p>
        </div>

        <div className="organisation-dashboard__identity">
          <span>{model.heading.provider}</span>
          <strong>{model.heading.name}</strong>
        </div>
      </header>

      <div className="dashboard-metric-grid">
        {model.metrics.map((metric) => (
          <DashboardMetricCard
            key={metric.id}
            metric={metric}
          />
        ))}
      </div>

      <DashboardStatusPanel items={model.status} />

      <UnavailableContractsPanel
        contracts={model.unavailableContracts}
      />
    </section>
  );
}

StaffologyOrganisationDashboard.propTypes = {
  employer: PropTypes.object.isRequired,
};
