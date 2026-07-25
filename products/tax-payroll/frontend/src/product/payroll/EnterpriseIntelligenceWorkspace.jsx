import PropTypes from 'prop-types';

import PayrollDecisionIntelligenceCentre from
  './PayrollDecisionIntelligenceCentre';
import PayrollOperationalOptimisationCentre from
  './PayrollOperationalOptimisationCentre';
import PayrollPredictiveIntelligenceCentre from
  './PayrollPredictiveIntelligenceCentre';

import {
  OperationalOptimisationProvider,
} from './operational-optimisation';
import {
  SelfHealingProvider,
} from './self-healing';

export default function EnterpriseIntelligenceWorkspace({
  optimisationSnapshot,
  selfHealingSnapshot,
  forecast,
  commandApi,
}) {
  return (
    <section className="enterprise-intelligence-workspace">
      <header>
        <span>Enterprise Intelligence Platform</span>
        <h2>Intelligence, Forecasting & Resilience</h2>
      </header>

      <PayrollDecisionIntelligenceCentre />
      <PayrollPredictiveIntelligenceCentre />

      <OperationalOptimisationProvider
        snapshot={optimisationSnapshot}
        forecast={forecast}
      >
        <SelfHealingProvider
          snapshot={selfHealingSnapshot}
          commandApi={commandApi}
        >
          <PayrollOperationalOptimisationCentre />
        </SelfHealingProvider>
      </OperationalOptimisationProvider>
    </section>
  );
}

EnterpriseIntelligenceWorkspace.propTypes = {
  optimisationSnapshot: PropTypes.object.isRequired,
  selfHealingSnapshot: PropTypes.object.isRequired,
  forecast: PropTypes.object,
  commandApi: PropTypes.object.isRequired,
};
