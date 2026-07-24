import {
  createActivityEntry,
} from './createActivityEntry';

export function buildPayrollActivity(snapshot, exceptions = []) {
  const entries = [
    runtimeEntry(snapshot),
    periodEntry(snapshot),
    pipelineEntry(snapshot),
    submissionEntry(snapshot),
    completionEntry(snapshot),
    ...exceptionEntries(exceptions),
  ].filter(Boolean);

  return Object.freeze(
    entries.sort(
      (a, b) =>
        new Date(b.occurredAt) - new Date(a.occurredAt)
    )
  );
}

function runtimeEntry(snapshot) {
  const session = snapshot?.session;
  if (!session) return null;

  return createActivityEntry({
    id: 'runtime-session',
    type: 'runtime',
    title: 'Payroll runtime',
    message: session.active
      ? 'Payroll session active'
      : 'Payroll session inactive',
    status: session.active ? 'active' : 'inactive',
    occurredAt: session.session?.activatedAt,
  });
}

function periodEntry(snapshot) {
  const period = snapshot?.period;
  if (!period) return null;

  return createActivityEntry({
    id: 'payroll-period',
    type: 'period',
    title: 'Payroll period',
    message: period.active
      ? 'Payroll period active'
      : 'Payroll period inactive',
    status: period.stage || 'unknown',
    occurredAt: period.period?.activatedAt,
  });
}

function pipelineEntry(snapshot) {
  const pipeline = snapshot?.pipeline;
  if (!pipeline) return null;

  return createActivityEntry({
    id: `pipeline:${pipeline.id || 'current'}`,
    type: 'pipeline',
    title: 'Payroll pipeline',
    message: `Pipeline status: ${pipeline.status || 'unknown'}`,
    status: pipeline.status || 'unknown',
    correlationId: pipeline.id,
    occurredAt: pipeline.updatedAt,
  });
}

function submissionEntry(snapshot) {
  const submission = snapshot?.submission;
  if (!submission) return null;

  return createActivityEntry({
    id: `submission:${submission.pipelineId || 'current'}`,
    type: 'submission',
    title: 'FPS submission',
    message: `Submission status: ${submission.status || 'idle'}`,
    status: submission.status || 'idle',
    correlationId: submission.pipelineId,
    occurredAt: submission.updatedAt,
  });
}

function completionEntry(snapshot) {
  const completion = snapshot?.completion?.completion;
  if (!completion) return null;

  return createActivityEntry({
    id: `completion:${completion.pipelineId || 'current'}`,
    type: 'completion',
    title: 'Payroll completion',
    message: `Completion status: ${completion.status}`,
    status: completion.status,
    correlationId: completion.pipelineId,
    occurredAt: completion.updatedAt,
  });
}

function exceptionEntries(exceptions) {
  return exceptions.map((item) => createActivityEntry({
    id: `exception:${item.id}`,
    type: 'exception',
    title: 'Operational exception',
    message: item.message,
    status: item.severity,
    occurredAt: item.detectedAt,
  }));
}
