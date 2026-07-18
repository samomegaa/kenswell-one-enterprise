import PropTypes from 'prop-types';

export default function ProviderDiagnosticsList({
  diagnostics = [],
}) {
  if (!diagnostics.length) {
    return (
      <p className="provider-empty-state">
        No provider diagnostics.
      </p>
    );
  }

  return (
    <ul className="provider-diagnostics-list">
      {diagnostics.map((diagnostic, index) => (
        <li
          key={
            diagnostic.id ||
            `${diagnostic.code}-${index}`
          }
          className={
            `provider-diagnostic ` +
            `provider-diagnostic--${diagnostic.severity || 'info'}`
          }
        >
          <div>
            <strong>
              {diagnostic.title ||
                diagnostic.code ||
                'Provider diagnostic'}
            </strong>

            <p>
              {diagnostic.message ||
                diagnostic.description}
            </p>
          </div>

          <small>
            {diagnostic.severity || 'info'}
          </small>
        </li>
      ))}
    </ul>
  );
}

ProviderDiagnosticsList.propTypes = {
  diagnostics: PropTypes.array,
};
