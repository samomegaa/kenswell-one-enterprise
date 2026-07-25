export async function archiveCompletedPayroll(context) {
  if (!context?.completion?.archive) {
    throw new Error('Payroll archive action unavailable');
  }

  await context.completion.archive();

  return Object.freeze({
    message: 'Completed payroll archived',
  });
}
