import {
  useCallback,
  useMemo,
  useState,
} from 'react';

import PropTypes from 'prop-types';

import {
  calculateAutomationMetrics,
  createAutomationRun,
  readAutomationHistory,
  writeAutomationHistory,
} from '../automation';

import {
  resolvePlaybook,
} from '../playbooks';

import {
  AUTOMATION_RULES,
  evaluateAutomationRules,
} from '../rules';

import {
  DEFAULT_SLA_POLICY,
  evaluateSla,
} from '../sla';

import {
  PayrollAutomationContext,
} from './PayrollAutomationContext';

import {
  recordAutomationActivity,
} from './automationEnterpriseAdapter';

export function PayrollAutomationProvider({
  snapshot,
  commandApi,
  enterpriseAdapter,
  children,
}) {
  const [history, setHistory] = useState(
    () => readAutomationHistory()
  );

  const sla = useMemo(
    () => evaluateSla(snapshot, DEFAULT_SLA_POLICY),
    [snapshot]
  );

  const evaluations = useMemo(
    () => evaluateAutomationRules(
      AUTOMATION_RULES,
      snapshot,
      sla
    ),
    [snapshot, sla]
  );

  const commit = useCallback((run, eventName) => {
    const next = [
      run,
      ...history.filter((item) => item.id !== run.id),
    ];

    setHistory(next);
    writeAutomationHistory(next);
    recordAutomationActivity(
      enterpriseAdapter,
      eventName,
      run
    );
  }, [history, enterpriseAdapter]);

  const runRule = useCallback((rule) => {
    if (!rule.matched) {
      throw new Error('Automation rule conditions not met');
    }

    const definition = commandApi.available.find(
      (item) => item.id === rule.commandType
    );

    if (!definition?.eligibility?.eligible) {
      throw new Error(
        definition?.eligibility?.reason ||
        'Command is not eligible'
      );
    }

    commandApi.request(definition);

    const run = createAutomationRun(rule, {
      id: 'governed-command-requested',
    });

    commit(run, 'AutomationCommandRequested');
  }, [commandApi, commit]);

  const metrics = useMemo(
    () => calculateAutomationMetrics({
      evaluations,
      history,
      sla,
    }),
    [evaluations, history, sla]
  );

  const value = useMemo(() => ({
    evaluations,
    history,
    metrics,
    sla,
    runRule,
    resolvePlaybook,
  }), [
    evaluations,
    history,
    metrics,
    sla,
    runRule,
  ]);

  return (
    <PayrollAutomationContext.Provider value={value}>
      {children}
    </PayrollAutomationContext.Provider>
  );
}

PayrollAutomationProvider.propTypes = {
  snapshot: PropTypes.object.isRequired,
  commandApi: PropTypes.object.isRequired,
  enterpriseAdapter: PropTypes.object,
  children: PropTypes.node.isRequired,
};
