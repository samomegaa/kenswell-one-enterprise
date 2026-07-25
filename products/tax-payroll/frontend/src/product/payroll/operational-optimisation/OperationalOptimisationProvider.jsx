import { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { createOptimisationAssessment } from './optimisationEngine';
import {
  readOptimisationHistory,
  writeOptimisationHistory,
} from './optimisationHistory';
import {
  OperationalOptimisationContext,
} from './OperationalOptimisationContext';

export function OperationalOptimisationProvider({
  snapshot,
  forecast,
  children,
}) {
  const [history, setHistory] = useState(
    () => readOptimisationHistory()
  );

  const evaluate = useCallback(() => {
    const assessment = createOptimisationAssessment({
      ...snapshot,
      forecast,
    });
    const next = [assessment, ...history];
    setHistory(next);
    writeOptimisationHistory(next);
    return assessment;
  }, [snapshot, forecast, history]);

  const value = useMemo(() => ({
    latest: history[0] || null,
    history,
    evaluate,
  }), [history, evaluate]);

  return (
    <OperationalOptimisationContext.Provider value={value}>
      {children}
    </OperationalOptimisationContext.Provider>
  );
}

OperationalOptimisationProvider.propTypes = {
  snapshot: PropTypes.object.isRequired,
  forecast: PropTypes.object,
  children: PropTypes.node.isRequired,
};
