export async function rerunValidation(context) {
  if (!context?.pipeline?.advance) {
    throw new Error('Validation action unavailable');
  }

  await context.pipeline.advance();

  return Object.freeze({
    message: 'Validation re-run requested',
  });
}
