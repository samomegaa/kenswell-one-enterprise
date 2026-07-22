import PropTypes from 'prop-types';

import StaffologyWorkspaceState
  from '../../StaffologyWorkspaceState';

import PayElementCard from './PayElementCard';

export default function PayElementGroup({
  group,
}) {
  if (!group.available) {
    return (
      <section className="pay-element-group">
        <h2>{group.title}</h2>

        <StaffologyWorkspaceState
          title={`${group.title} unavailable`}
          message={
            `${group.title} information is not present ` +
            'in the current Staffology employer response.'
          }
        />
      </section>
    );
  }

  if (!group.items.length) {
    return (
      <section className="pay-element-group">
        <h2>{group.title}</h2>

        <StaffologyWorkspaceState
          title={`No ${group.title.toLowerCase()}`}
          message={
            `No ${group.title.toLowerCase()} are recorded.`
          }
          tone="information"
        />
      </section>
    );
  }

  return (
    <section className="pay-element-group">
      <header>
        <h2>{group.title}</h2>
        <p>
          Read-only {group.title.toLowerCase()}
          supplied by Staffology.
        </p>
      </header>

      <div className="organisation-collection-grid">
        {group.items.map((element) => (
          <PayElementCard
            key={element.id}
            element={element}
          />
        ))}
      </div>
    </section>
  );
}

PayElementGroup.propTypes = {
  group: PropTypes.shape({
    title: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
  }).isRequired,
};
