import PropTypes from 'prop-types';

function displayValue(value) {
  if (
    value === null ||
    value === undefined ||
    value === ''
  ) {
    return '—';
  }

  return typeof value === 'object'
    ? JSON.stringify(value)
    : String(value);
}

export default function ProviderConflictList({
  conflicts = [],
  onSelectSection,
}) {
  if (!conflicts.length) {
    return (
      <p className="provider-empty-state">
        No provider conflicts.
      </p>
    );
  }

  return (
    <div className="provider-conflict-list">
      {conflicts.map((conflict, index) => (
        <article
          key={
            conflict.id ||
            `${conflict.fieldId}-${index}`
          }
        >
          <header>
            <div>
              <strong>
                {conflict.label ||
                  conflict.fieldId ||
                  'Provider conflict'}
              </strong>
              <small>
                {conflict.status ||
                  'Unresolved'}
              </small>
            </div>

            {conflict.sectionId && (
              <button
                type="button"
                onClick={() =>
                  onSelectSection?.(
                    conflict.sectionId
                  )
                }
              >
                Open section
              </button>
            )}
          </header>

          <dl>
            <div>
              <dt>Enterprise</dt>
              <dd>
                {displayValue(
                  conflict.enterpriseValue
                )}
              </dd>
            </div>

            <div>
              <dt>Provider</dt>
              <dd>
                {displayValue(
                  conflict.providerValue
                )}
              </dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}

ProviderConflictList.propTypes = {
  conflicts: PropTypes.array,
  onSelectSection: PropTypes.func,
};
