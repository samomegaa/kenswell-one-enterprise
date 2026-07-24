export function createActivityEntry({
  id,
  type,
  title,
  message,
  status,
  correlationId,
  occurredAt,
  metadata,
}) {
  return Object.freeze({
    id,
    type,
    title,
    message,
    status,
    correlationId: correlationId || null,
    occurredAt: occurredAt || new Date().toISOString(),
    metadata: metadata || {},
  });
}
