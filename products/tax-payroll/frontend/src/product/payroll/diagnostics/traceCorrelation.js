export function traceCorrelation(entries, correlationId) {
  if (!correlationId) return [];

  return entries.filter(
    (entry) => entry.correlationId === correlationId
  );
}
