import PropTypes from 'prop-types';

import PayItemTable from './PayItemTable';

export default function PayItemSection({
  title,
  collection,
}) {
  if (!collection.available) {
    return (
      <section className="pay-item-section">
        <h3>{title}</h3>
        <p className="pay-item-state">
          This collection is not present in the current
          Staffology employee response.
        </p>
      </section>
    );
  }

  if (!collection.items.length) {
    return (
      <section className="pay-item-section">
        <h3>{title}</h3>
        <p className="pay-item-state">
          No {title.toLowerCase()} are recorded.
        </p>
      </section>
    );
  }

  return (
    <section className="pay-item-section">
      <h3>{title}</h3>
      <PayItemTable items={collection.items} />
    </section>
  );
}

PayItemSection.propTypes = {
  title: PropTypes.string.isRequired,
  collection: PropTypes.shape({
    available: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
  }).isRequired,
};
