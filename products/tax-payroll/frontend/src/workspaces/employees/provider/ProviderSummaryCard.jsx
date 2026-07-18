import PropTypes from 'prop-types';

import ProviderStatusBadge
  from './ProviderStatusBadge';

function valueOrDash(value) {
  return value || '—';
}

export default function ProviderSummaryCard({
  summary = {},
  contract = {},
}) {
  return (
    <article className="provider-summary-card">
      <header>
        <div>
          <p>Connected provider</p>
          <h3>
            {valueOrDash(summary.provider)}
          </h3>
        </div>

        <ProviderStatusBadge
          status={
            summary.synchronisationState
          }
        />
      </header>

      <dl>
        <div>
          <dt>Provider employee ID</dt>
          <dd>
            {valueOrDash(
              summary.providerEmployeeId
            )}
          </dd>
        </div>

        <div>
          <dt>Connection</dt>
          <dd>
            {valueOrDash(
              summary.connectionStatus
            )}
          </dd>
        </div>

        <div>
          <dt>Last synchronised</dt>
          <dd>
            {valueOrDash(
              summary.lastSynchronisedAt
            )}
          </dd>
        </div>

        <div>
          <dt>Contract version</dt>
          <dd>
            {valueOrDash(
              contract.version
            )}
          </dd>
        </div>
      </dl>
    </article>
  );
}

ProviderSummaryCard.propTypes = {
  summary: PropTypes.object,
  contract: PropTypes.object,
};
