import {
  createSubmissionIdempotencyKey,
} from './createSubmissionIdempotencyKey';

export function createDispatchRequest(fpsRequest) {
  return Object.freeze({
    fpsRequestId: fpsRequest.id,
    correlationId: fpsRequest.correlationId,
    idempotencyKey:
      createSubmissionIdempotencyKey(fpsRequest),
    provider: fpsRequest.provider,
    queuedAt: new Date().toISOString(),
  });
}
