import {
  useCallback,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import {
  createExecutionPlanFromRunbook,
  calculateExecutionMetrics,
} from '../intelligent-execution';
import { createOrchestrationGraph } from './createOrchestrationGraph';
import { resolveReadyNodes } from './dependencyResolver';
import { createExecutionQueue } from './executionQueue';
import {
  readOrchestrationHistory,
  writeOrchestrationHistory,
} from './orchestrationHistory';
import {
  PayrollAutomationOrchestratorContext,
} from './PayrollAutomationOrchestratorContext';

export function PayrollAutomationOrchestratorProvider({
  schedulingApi,
  commandApi,
  children,
}) {
  const [executions, setExecutions] = useState(
    () => readOrchestrationHistory()
  );

  const launchRunbook = useCallback((runbook) => {
    const plan = createExecutionPlanFromRunbook(runbook);
    const graph = createOrchestrationGraph(plan);
    const ready = resolveReadyNodes(graph);
    const queue = createExecutionQueue(ready);

    const execution = {
      id: crypto.randomUUID(),
      plan,
      graph,
      queue,
      status: queue.length ? 'ready' : 'waiting',
      decision: queue.length ? 'execute' : 'wait',
      createdAt: new Date().toISOString(),
    };

    const next = [execution, ...executions];
    setExecutions(next);
    writeOrchestrationHistory(next);
  }, [executions]);

  const requestNextCommand = useCallback((execution) => {
    const node = execution.queue[0];

    if (!node?.commandType) return;

    const definition = commandApi.available.find(
      (item) => item.id === node.commandType
    );

    if (definition?.eligibility?.eligible) {
      commandApi.request(definition);
    }
  }, [commandApi]);

  const value = useMemo(() => ({
    executions,
    metrics: calculateExecutionMetrics(executions),
    runbooks: schedulingApi.runbooks,
    launchRunbook,
    requestNextCommand,
  }), [
    executions,
    schedulingApi.runbooks,
    launchRunbook,
    requestNextCommand,
  ]);

  return (
    <PayrollAutomationOrchestratorContext.Provider
      value={value}
    >
      {children}
    </PayrollAutomationOrchestratorContext.Provider>
  );
}

PayrollAutomationOrchestratorProvider.propTypes = {
  schedulingApi: PropTypes.object.isRequired,
  commandApi: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
