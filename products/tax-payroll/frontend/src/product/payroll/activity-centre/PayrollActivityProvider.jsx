import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import PropTypes from 'prop-types';

import {
  buildPayrollActivity,
  readActivityHistory,
  writeActivityHistory,
} from '../activity';

import {
  buildRuntimeDiagnostics,
} from '../diagnostics';

import {
  buildTimelineSummary,
  filterTimeline,
} from '../timeline';

import {
  PayrollActivityContext,
} from './PayrollActivityContext';

export function PayrollActivityProvider({
  snapshot,
  exceptions,
  children,
}) {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const activity = useMemo(
    () => buildPayrollActivity(snapshot, exceptions),
    [snapshot, exceptions]
  );

  useEffect(() => {
    const history = readActivityHistory();
    const merged = mergeActivity(activity, history);
    writeActivityHistory(merged);
  }, [activity]);

  const visibleActivity = useMemo(
    () => filterTimeline(activity, filter, query),
    [activity, filter, query]
  );

  const summary = useMemo(
    () => buildTimelineSummary(activity),
    [activity]
  );

  const diagnostics = useMemo(
    () => buildRuntimeDiagnostics(snapshot),
    [snapshot]
  );

  const value = useMemo(() => ({
    activity,
    visibleActivity,
    summary,
    diagnostics,
    filter,
    query,
    setFilter,
    setQuery,
  }), [
    activity,
    visibleActivity,
    summary,
    diagnostics,
    filter,
    query,
  ]);

  return (
    <PayrollActivityContext.Provider value={value}>
      {children}
    </PayrollActivityContext.Provider>
  );
}

function mergeActivity(current, history) {
  const map = new Map();

  [...current, ...history].forEach((entry) => {
    map.set(entry.id, entry);
  });

  return [...map.values()].sort(
    (a, b) =>
      new Date(b.occurredAt) - new Date(a.occurredAt)
  );
}

PayrollActivityProvider.propTypes = {
  snapshot: PropTypes.object.isRequired,
  exceptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.node.isRequired,
};
