const crypto = require('crypto');
const { TraceError } = require('./observability-errors');

const spans = [];

function createTraceId() {
  return `trace_${crypto.randomUUID()}`;
}

function createSpanId() {
  return `span_${crypto.randomUUID()}`;
}

class Tracer {
  startSpan({
    name,
    traceId = null,
    parentSpanId = null,
    enterpriseContext = null,
    metadata = {},
  } = {}) {
    if (!name || typeof name !== 'string') {
      throw new TraceError('span name is required');
    }

    const span = Object.freeze({
      traceId: traceId || createTraceId(),
      spanId: createSpanId(),
      parentSpanId,
      name,
      requestId: enterpriseContext?.requestId || null,
      correlationId: enterpriseContext?.correlationId || null,
      tenantId: enterpriseContext?.tenant?.id || null,
      actorId: enterpriseContext?.identity?.userId || null,
      startedAt: new Date().toISOString(),
      endedAt: null,
      durationMs: null,
      status: 'started',
      metadata,
    });

    spans.push(span);
    return span;
  }

  endSpan(span, { status = 'completed', metadata = {} } = {}) {
    if (!span || !span.spanId) {
      throw new TraceError('valid span is required');
    }

    const index = spans.findIndex((entry) => entry.spanId === span.spanId);

    if (index === -1) {
      throw new TraceError('span not found', { spanId: span.spanId });
    }

    const endedAtMs = Date.now();
    const startedAtMs = new Date(span.startedAt).getTime();

    const updated = Object.freeze({
      ...span,
      endedAt: new Date(endedAtMs).toISOString(),
      durationMs: endedAtMs - startedAtMs,
      status,
      metadata: {
        ...span.metadata,
        ...metadata,
      },
    });

    spans[index] = updated;
    return updated;
  }

  listSpans() {
    return [...spans];
  }

  clear() {
    spans.length = 0;
  }
}

const defaultTracer = new Tracer();

module.exports = {
  Tracer,
  defaultTracer,
  createTraceId,
  createSpanId,
};
