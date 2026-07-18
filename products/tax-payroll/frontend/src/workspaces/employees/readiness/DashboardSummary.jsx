import PropTypes from 'prop-types';

function valueOrDash(value) {
  return value || '—';
}

export default function DashboardSummary({
  workspace,
}) {
  const provider =
    workspace.providerPanel?.summary || {};

  const timeline =
    workspace.readiness?.timeline || {};

  return (
    <dl className="readiness-summary">
      <div>
        <dt>Provider</dt>
        <dd>{valueOrDash(provider.provider)}</dd>
      </div>

      <div>
        <dt>Synchronisation</dt>
        <dd>
          {valueOrDash(
            provider.synchronisationState
          )}
        </dd>
      </div>

      <div>
        <dt>Workspace version</dt>
        <dd>
          {valueOrDash(
            timeline.workspaceVersion
          )}
        </dd>
      </div>

      <div>
        <dt>Contract version</dt>
        <dd>
          {valueOrDash(
            workspace.contract?.version
          )}
        </dd>
      </div>

      <div>
        <dt>Calculated</dt>
        <dd>
          {valueOrDash(
            timeline.calculatedAt
          )}
        </dd>
      </div>

      <div>
        <dt>Last synchronised</dt>
        <dd>
          {valueOrDash(
            provider.lastSynchronisedAt
          )}
        </dd>
      </div>
    </dl>
  );
}

DashboardSummary.propTypes = {
  workspace: PropTypes.object.isRequired,
};
