import {
  useCallback,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import { buildDecisionEvidence } from './evidenceBuilder';
import { createEnterpriseDecision } from './decisionEngine';
import { DECISION_COMMAND_MAP } from './decisionCommandMap';
import {
  readDecisionHistory,
  writeDecisionHistory,
} from './decisionHistory';
import { recordDecisionAudit } from './decisionAuditAdapter';
import {
  PayrollDecisionIntelligenceContext,
} from './PayrollDecisionIntelligenceContext';

export function PayrollDecisionIntelligenceProvider({
  operations,
  orchestration,
  commandApi,
  enterpriseAdapter,
  children,
}) {
  const [history, setHistory] = useState(
    () => readDecisionHistory()
  );

  const evaluate = useCallback(() => {
    const evidence = buildDecisionEvidence({
      operations,
      orchestration,
      command: {
        approvalPending: commandApi.pending?.length > 0,
      },
    });

    const decision = createEnterpriseDecision(evidence);
    const next = [decision, ...history];

    setHistory(next);
    writeDecisionHistory(next);
    recordDecisionAudit(enterpriseAdapter, decision);

    return decision;
  }, [
    operations,
    orchestration,
    commandApi.pending,
    history,
    enterpriseAdapter,
  ]);

  const requestStrategy = useCallback((decision) => {
    const commandType = DECISION_COMMAND_MAP[
      decision.strategy
    ];

    if (!commandType) return;

    const definition = commandApi.available.find(
      (item) => item.id === commandType
    );

    if (!definition?.eligibility?.eligible) {
      throw new Error(
        definition?.eligibility?.reason ||
        'Recommended command is not eligible'
      );
    }

    commandApi.request(definition);
  }, [commandApi]);

  const latest = history[0] || null;

  const value = useMemo(() => ({
    history,
    latest,
    evaluate,
    requestStrategy,
  }), [history, latest, evaluate, requestStrategy]);

  return (
    <PayrollDecisionIntelligenceContext.Provider
      value={value}
    >
      {children}
    </PayrollDecisionIntelligenceContext.Provider>
  );
}

PayrollDecisionIntelligenceProvider.propTypes = {
  operations: PropTypes.object.isRequired,
  orchestration: PropTypes.object.isRequired,
  commandApi: PropTypes.object.isRequired,
  enterpriseAdapter: PropTypes.object,
  children: PropTypes.node.isRequired,
};
