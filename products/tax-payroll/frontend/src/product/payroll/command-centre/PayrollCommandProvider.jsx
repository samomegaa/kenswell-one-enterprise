import {
  useCallback,
  useMemo,
  useState,
} from 'react';

import PropTypes from 'prop-types';

import {
  executeOperationalAction,
} from '../actions';

import {
  COMMAND_REGISTRY,
  createCommand,
  evaluateCommandEligibility,
  readCommandHistory,
  writeCommandHistory,
} from '../command';

import {
  approveCommand,
  rejectCommand,
} from '../command-approvals';

import {
  PayrollCommandContext,
} from './PayrollCommandContext';

import {
  recordCommandActivity,
} from './commandEnterpriseAdapter';

export function PayrollCommandProvider({
  snapshot,
  actionContext,
  enterpriseAdapter,
  children,
}) {
  const [commands, setCommands] = useState(
    () => readCommandHistory()
  );

  const available = useMemo(
    () => COMMAND_REGISTRY.map((item) => ({
      ...item,
      eligibility: evaluateCommandEligibility(
        item.id,
        snapshot
      ),
    })),
    [snapshot]
  );

  const commit = useCallback((next, eventName) => {
    const history = [
      next,
      ...commands.filter((item) => item.id !== next.id),
    ];

    setCommands(history);
    writeCommandHistory(history);
    recordCommandActivity(
      enterpriseAdapter,
      eventName,
      next
    );
  }, [commands, enterpriseAdapter]);

  const request = useCallback((definition) => {
    if (!definition.eligibility.eligible) {
      throw new Error(definition.eligibility.reason);
    }

    const next = createCommand({
      type: definition.id,
      label: definition.label,
      correlationId: snapshot?.pipeline?.id,
      requiresApproval: definition.requiresApproval,
    });

    commit(next, 'OperationalCommandRequested');
  }, [snapshot, commit]);

  const approve = useCallback((command) => {
    commit(
      approveCommand(command),
      'OperationalCommandApproved'
    );
  }, [commit]);

  const reject = useCallback((command) => {
    commit(
      rejectCommand(command),
      'OperationalCommandRejected'
    );
  }, [commit]);

  const execute = useCallback(async (command) => {
    if (command.status !== 'approved') {
      throw new Error('Approved command required');
    }

    commit(
      { ...command, status: 'running' },
      'OperationalCommandStarted'
    );

    try {
      const result = await executeOperationalAction(
        command.type,
        actionContext
      );

      commit({
        ...command,
        status: 'completed',
        result,
        completedAt: new Date().toISOString(),
      }, 'OperationalCommandCompleted');
    } catch (error) {
      commit({
        ...command,
        status: 'failed',
        error: String(error.message || error),
        completedAt: new Date().toISOString(),
      }, 'OperationalCommandFailed');
    }
  }, [actionContext, commit]);

  const value = useMemo(() => ({
    available,
    commands,
    request,
    approve,
    reject,
    execute,
  }), [
    available,
    commands,
    request,
    approve,
    reject,
    execute,
  ]);

  return (
    <PayrollCommandContext.Provider value={value}>
      {children}
    </PayrollCommandContext.Provider>
  );
}

PayrollCommandProvider.propTypes = {
  snapshot: PropTypes.object.isRequired,
  actionContext: PropTypes.object.isRequired,
  enterpriseAdapter: PropTypes.object,
  children: PropTypes.node.isRequired,
};
