export function createExecutionQueue(nodes) {
  return [...nodes]
    .sort((left, right) =>
      (right.priority || 50) - (left.priority || 50)
    )
    .map((node, index) => ({
      ...node,
      queuePosition: index + 1,
    }));
}
