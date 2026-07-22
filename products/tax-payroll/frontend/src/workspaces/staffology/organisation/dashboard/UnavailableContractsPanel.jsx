import PropTypes from 'prop-types';

export default function UnavailableContractsPanel({
  contracts,
}) {
  return (
    <section className="dashboard-contract-panel">
      <h2>Contract availability</h2>

      {!contracts.length ? (
        <p>
          All recognised organisation contracts are
          available.
        </p>
      ) : (
        <>
          <p>
            These contracts are not present in the
            current Staffology employer response:
          </p>

          <ul>
            {contracts.map((contract) => (
              <li key={contract}>{contract}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

UnavailableContractsPanel.propTypes = {
  contracts: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
};
