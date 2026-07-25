export async function restartPipeline(context) {
  if (!context?.pipeline?.resume) {
    throw new Error('Pipeline recovery action unavailable');
  }

  await context.pipeline.resume();

  return Object.freeze({
    message: 'Payroll pipeline recovery requested',
  });
}
