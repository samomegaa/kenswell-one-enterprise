export function decideNextAction({
  readyNodes,
  waitingNodes,
  failedNodes,
}) {
  if (failedNodes.length > 0) {
    return { action: 'recover', reason: 'Failed node detected' };
  }

  if (readyNodes.length > 0) {
    return { action: 'execute', reason: 'Ready work available' };
  }

  if (waitingNodes.length > 0) {
    return { action: 'wait', reason: 'Governed approval pending' };
  }

  return { action: 'complete', reason: 'No remaining work' };
}
