export function createRollbackPlan({
  checkpoint,
  affectedResources = [],
}) {
  if (!checkpoint) {
    return {
      available: false,
      reason: 'No recovery checkpoint is available',
      steps: [],
    };
  }

  return {
    available: true,
    reason: 'Rollback checkpoint available',
    steps: affectedResources.map((resource) => ({
      resource,
      checkpoint,
      action: 'restore',
    })),
  };
}
