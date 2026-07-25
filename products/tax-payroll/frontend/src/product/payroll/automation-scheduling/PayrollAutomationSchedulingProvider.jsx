import {
  useCallback,
  useMemo,
  useState,
} from 'react';

import PropTypes from 'prop-types';

import {
  AUTOMATION_SCHEDULES,
  evaluateSchedule,
} from './index';

import {
  EVENT_WORKFLOWS,
  matchEventWorkflow,
} from '../event-workflows';

import {
  createExecutionPlan,
  readExecutionPlanHistory,
  writeExecutionPlanHistory,
} from '../execution-plans';

import {
  OPERATIONAL_RUNBOOKS,
  resolveOperationalRunbook,
} from '../runbooks';

import {
  PayrollAutomationSchedulingContext,
} from './PayrollAutomationSchedulingContext';

import {
  recordSchedulingActivity,
} from './schedulingEnterpriseAdapter';

export function PayrollAutomationSchedulingProvider({
  commandApi,
  enterpriseAdapter,
  children,
}) {
  const [history, setHistory] = useState(
    () => readExecutionPlanHistory()
  );

  const schedules = useMemo(
    () => AUTOMATION_SCHEDULES.map((schedule) => ({
      ...schedule,
      evaluation: evaluateSchedule(schedule),
    })),
    []
  );

  const commit = useCallback((plan, eventName) => {
    const next = [
      plan,
      ...history.filter((item) => item.id !== plan.id),
    ];

    setHistory(next);
    writeExecutionPlanHistory(next);
    recordSchedulingActivity(
      enterpriseAdapter,
      eventName,
      plan
    );
  }, [history, enterpriseAdapter]);

  const requestCommand = useCallback((commandType) => {
    const definition = commandApi.available.find(
      (item) => item.id === commandType
    );

    if (!definition?.eligibility?.eligible) {
      throw new Error(
        definition?.eligibility?.reason ||
        'Command is not eligible'
      );
    }

    commandApi.request(definition);
  }, [commandApi]);

  const runSchedule = useCallback((schedule) => {
    const runbook = OPERATIONAL_RUNBOOKS.find(
      (item) => item.commandType === schedule.commandType
    ) || OPERATIONAL_RUNBOOKS.find(
      (item) =>
        item.id.includes(
          schedule.ruleId?.replace('retry-failed-', '')
        )
    );

    const resolved = runbook || OPERATIONAL_RUNBOOKS[0];

    requestCommand(resolved.commandType);

    const plan = createExecutionPlan({
      source: 'schedule',
      scheduleId: schedule.id,
      runbook: resolved,
    });

    commit(plan, 'AutomationScheduleTriggered');
  }, [requestCommand, commit]);

  const handleEvent = useCallback((eventName) => {
    const workflows = matchEventWorkflow(
      eventName,
      EVENT_WORKFLOWS
    );

    workflows.forEach((workflow) => {
      const runbook = resolveOperationalRunbook(
        workflow.runbookId
      );

      if (!runbook) return;

      requestCommand(workflow.commandType);

      const plan = createExecutionPlan({
        source: 'event',
        workflowId: workflow.id,
        runbook,
      });

      commit(plan, 'EventWorkflowTriggered');
    });
  }, [requestCommand, commit]);

  const value = useMemo(() => ({
    schedules,
    workflows: EVENT_WORKFLOWS,
    runbooks: OPERATIONAL_RUNBOOKS,
    history,
    runSchedule,
    handleEvent,
  }), [
    schedules,
    history,
    runSchedule,
    handleEvent,
  ]);

  return (
    <PayrollAutomationSchedulingContext.Provider
      value={value}
    >
      {children}
    </PayrollAutomationSchedulingContext.Provider>
  );
}

PayrollAutomationSchedulingProvider.propTypes = {
  commandApi: PropTypes.object.isRequired,
  enterpriseAdapter: PropTypes.object,
  children: PropTypes.node.isRequired,
};
