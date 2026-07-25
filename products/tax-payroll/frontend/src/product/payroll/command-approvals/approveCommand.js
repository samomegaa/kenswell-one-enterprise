export function approveCommand(command, actor = 'enterprise-admin') {
  if (command.status !== 'awaiting-approval') {
    throw new Error('Command is not awaiting approval');
  }

  return Object.freeze({
    ...command,
    status: 'approved',
    approvedBy: actor,
    approvedAt: new Date().toISOString(),
  });
}
