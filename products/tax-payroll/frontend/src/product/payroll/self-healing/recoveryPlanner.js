import { orderDependencyRecovery } from './dependencyRecovery';
import { RECOVERY_PLAYBOOKS } from './recoveryPlaybooks';
import { createRollbackPlan } from './rollbackPlanner';

export function createRecoveryPlan({
  incidentType,
  dependencies,
  checkpoint,
  affectedResources,
}) {
  const playbook = RECOVERY_PLAYBOOKS.find(
    (item) => item.id === incidentType
  );

  if (!playbook) {
    return {
      status: 'blocked',
      reason: 'No governed recovery playbook matched',
    };
  }

  return Object.freeze({
    id: crypto.randomUUID(),
    incidentType,
    strategy: playbook.strategy,
    commandType: playbook.commandType,
    dependencySteps: orderDependencyRecovery(dependencies),
    rollback: createRollbackPlan({
      checkpoint,
      affectedResources,
    }),
    status: playbook.approvalRequired
      ? 'approval-required'
      : 'planned',
    createdAt: new Date().toISOString(),
  });
}
