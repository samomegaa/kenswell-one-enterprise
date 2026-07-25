import { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { evaluateSelfHealing } from './selfHealingRuntime';
import {
  readSelfHealingHistory,
  writeSelfHealingHistory,
} from './selfHealingHistory';
import { SelfHealingContext } from './SelfHealingContext';

export function SelfHealingProvider({
  snapshot,
  commandApi,
  children,
}) {
  const [history, setHistory] = useState(
    () => readSelfHealingHistory()
  );

  const evaluate = useCallback(() => {
    const result = evaluateSelfHealing(snapshot);
    if (result.plan) {
      const next = [result.plan, ...history];
      setHistory(next);
      writeSelfHealingHistory(next);
    }
    return result;
  }, [snapshot, history]);

  const requestRecovery = useCallback((plan) => {
    const definition = commandApi.available.find(
      (item) => item.id === plan.commandType
    );
    if (!definition?.eligibility?.eligible) {
      throw new Error(
        definition?.eligibility?.reason ||
        'Recovery command is not eligible'
      );
    }
    commandApi.request(definition);
  }, [commandApi]);

  const value = useMemo(() => ({
    latest: history[0] || null,
    history,
    evaluate,
    requestRecovery,
  }), [history, evaluate, requestRecovery]);

  return (
    <SelfHealingContext.Provider value={value}>
      {children}
    </SelfHealingContext.Provider>
  );
}

SelfHealingProvider.propTypes = {
  snapshot: PropTypes.object.isRequired,
  commandApi: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
