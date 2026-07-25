export function createCheckpoint(execution, node) {
  return Object.freeze({
    id: crypto.randomUUID(),
    executionId: execution.id,
    nodeId: node.id,
    status: node.status,
    recordedAt: new Date().toISOString(),
  });
}
