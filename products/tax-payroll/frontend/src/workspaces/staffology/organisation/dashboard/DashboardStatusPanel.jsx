import PropTypes from 'prop-types';

import OrganisationField
  from '../OrganisationField';

export default function DashboardStatusPanel({ items }) {
  return (
    <section className="dashboard-status-panel">
      <h2>Runtime status</h2>

      <dl className="organisation-field-grid">
        {items.map((item) => (
          <OrganisationField
            key={item.label}
            label={item.label}
            value={item.value}
          />
        ))}
      </dl>
    </section>
  );
}

DashboardStatusPanel.propTypes = {
  items: PropTypes.array.isRequired,
};
