export function evaluateWaitState(node, command) {
  if (!node.waitForApproval) {
    return { waiting: false, reason: null };
  }

  const approved = command?.status === 'approved';

  return {
    waiting: !approved,
    reason: approved ? null : 'Awaiting governed command approval',
  };
}
