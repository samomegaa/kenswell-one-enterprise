export function rejectCommand(command, reason) {
  if (command.status !== 'awaiting-approval') {
    throw new Error('Command is not awaiting approval');
  }

  return Object.freeze({
    ...command,
    status: 'rejected',
    rejectionReason: reason || 'Rejected by administrator',
    completedAt: new Date().toISOString(),
  });
}
