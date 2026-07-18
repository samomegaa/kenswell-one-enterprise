import {
  useRef,
} from 'react';

import PropTypes from 'prop-types';

import ProviderActions
  from './ProviderActions';

import ProviderConflictList
  from './ProviderConflictList';

import ProviderDiagnosticsList
  from './ProviderDiagnosticsList';

import ProviderHistoryTimeline
  from './ProviderHistoryTimeline';

import ProviderSummaryCard
  from './ProviderSummaryCard';

export default function ProviderPanel({
  panel = {},
  contract = {},
  onRefresh,
  onPrepareSynchronisation,
  onSelectSection,
}) {
  const diagnosticsRef = useRef(null);
  const historyRef = useRef(null);

  return (
    <section
      className="provider-panel"
      aria-label="Provider synchronisation"
    >
      <header className="provider-panel__header">
        <div>
          <p>Provider synchronisation</p>
          <h2>External payroll provider</h2>
        </div>

        <ProviderActions
          onRefresh={onRefresh}
          onViewDiagnostics={() =>
            diagnosticsRef.current?.scrollIntoView({
              behavior: 'smooth',
            })
          }
          onViewHistory={() =>
            historyRef.current?.scrollIntoView({
              behavior: 'smooth',
            })
          }
          onPrepareSynchronisation={
            onPrepareSynchronisation
          }
        />
      </header>

      <ProviderSummaryCard
        summary={panel.summary}
        contract={contract}
      />

      <div className="provider-panel__grid">
        <section ref={diagnosticsRef}>
          <h3>Diagnostics</h3>
          <ProviderDiagnosticsList
            diagnostics={panel.diagnostics}
          />
        </section>

        <section ref={historyRef}>
          <h3>History</h3>
          <ProviderHistoryTimeline
            history={panel.history}
          />
        </section>
      </div>

      <section>
        <h3>Conflicts</h3>
        <ProviderConflictList
          conflicts={panel.conflicts}
          onSelectSection={onSelectSection}
        />
      </section>
    </section>
  );
}

ProviderPanel.propTypes = {
  panel: PropTypes.object,
  contract: PropTypes.object,
  onRefresh: PropTypes.func.isRequired,
  onPrepareSynchronisation:
    PropTypes.func.isRequired,
  onSelectSection: PropTypes.func.isRequired,
};
