export function calculateExecutionMetrics(executions) {
  const total = executions.length;
  const completed = executions.filter(
    (item) => item.status === 'completed'
  ).length;
  const failed = executions.filter(
    (item) => item.status === 'failed'
  ).length;

  return Object.freeze({
    total,
    completed,
    failed,
    successRate: total
      ? Math.round((completed / total) * 100)
      : 0,
  });
}
