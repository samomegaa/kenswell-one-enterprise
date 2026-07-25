export function optimiseQueueOrder(items = []) {
  return [...items].sort((left, right) => {
    const priority = (right.priority || 0) - (left.priority || 0);
    if (priority !== 0) return priority;
    return new Date(left.createdAt || 0) -
      new Date(right.createdAt || 0);
  });
}
