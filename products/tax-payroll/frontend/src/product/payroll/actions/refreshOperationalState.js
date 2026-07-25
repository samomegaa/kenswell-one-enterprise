export async function refreshOperationalState(context) {
  context?.refresh?.();

  return Object.freeze({
    message: 'Operational state refreshed',
  });
}
