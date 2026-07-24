import { executePayrollJob } from '../execution';
import { getNextCheckpoint } from './pipelineCheckpoints';

export async function advancePipeline(pipeline, providerAdapter) {
  if (!pipeline || ['cancelled', 'completed', 'paused'].includes(pipeline.status)) return pipeline;
  const nextJob = pipeline.queue?.find((job) => job.status === 'queued');
  if (nextJob) {
    const result = await executePayrollJob(nextJob, providerAdapter);
    const queue = pipeline.queue.map((job) => job.id === nextJob.id ? { ...job, status: result.status } : job);
    return Object.freeze({
      ...pipeline,
      status: result.status === 'failed' ? 'failed' : 'running',
      processed: result.status === 'succeeded' ? pipeline.processed + 1 : pipeline.processed,
      queue, results: [...pipeline.results, result], updatedAt: new Date().toISOString(),
    });
  }
  const checkpoint = getNextCheckpoint(pipeline.checkpoint);
  return Object.freeze({
    ...pipeline, status: checkpoint ? 'running' : 'completed',
    checkpoint: checkpoint || 'completed',
    startedAt: pipeline.startedAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}
