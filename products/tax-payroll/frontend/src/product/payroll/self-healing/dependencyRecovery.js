export function orderDependencyRecovery(dependencies = []) {
  return [...dependencies]
    .filter((item) => item.status !== 'healthy')
    .sort((left, right) => (left.order || 0) - (right.order || 0))
    .map((item) => ({
      id: item.id,
      action: item.recoveryAction || 'restart',
    }));
}
