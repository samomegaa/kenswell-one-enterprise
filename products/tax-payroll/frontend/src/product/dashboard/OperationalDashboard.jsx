import PropTypes from 'prop-types';

import DashboardActionCard from './DashboardActionCard';
import DashboardMetric from './DashboardMetric';

import {
  DASHBOARD_ACTIONS,
  DASHBOARD_METRICS,
} from './dashboardModel';

import './operational-dashboard.css';
import './operational-dashboard-responsive.css';

export default function OperationalDashboard({ children }) {
  return (
    <section className="operational-dashboard">
      <header className="operational-dashboard__header">
        <div>
          <p>Staffology operational payroll</p>
          <h1>Dashboard</h1>
          <span>
            Monitor employer readiness and continue operational work.
          </span>
        </div>
        <strong>Enterprise runtime active</strong>
      </header>

      <div className="operational-dashboard__metrics">
        {DASHBOARD_METRICS.map((metric) => (
          <DashboardMetric key={metric.id} metric={metric} />
        ))}
      </div>

      <section className="operational-dashboard__actions">
        <header>
          <p>Operational work</p>
          <h2>Continue where attention is required</h2>
        </header>

        <div>
          {DASHBOARD_ACTIONS.map((action) => (
            <DashboardActionCard
              key={action.id}
              action={action}
            />
          ))}
        </div>
      </section>

      <section className="operational-dashboard__provider">
        <header>
          <p>Connected provider</p>
          <h2>Staffology workspace</h2>
          <span>
            Employer discovery and provider diagnostics remain
            available below.
          </span>
        </header>
        <div className="operational-dashboard__provider-content">
          {children}
        </div>
      </section>
    </section>
  );
}

OperationalDashboard.propTypes = {
  children: PropTypes.node.isRequired,
};
