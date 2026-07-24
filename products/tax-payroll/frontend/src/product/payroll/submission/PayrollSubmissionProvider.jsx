import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import PropTypes from 'prop-types';

import {
  createDispatchRequest,
  dispatchPayrollSubmission,
  canRetrySubmission,
} from '../dispatch';
import {
  createFpsRequest,
  readFpsRequest,
  writeFpsRequest,
} from '../fps';
import {
  evaluateSubmissionReadiness,
} from '../readiness';
import {
  PayrollSubmissionContext,
} from './PayrollSubmissionContext';
import {
  createSubmissionState,
} from './createSubmissionState';
import {
  publishSubmissionEvent,
  writeSubmissionAudit,
} from './submissionEnterpriseAdapter';
import {
  readSubmissionState,
  writeSubmissionState,
} from './submissionStorage';

export function PayrollSubmissionProvider({
  pipeline,
  approval,
  compliance,
  employer,
  period,
  providerAdapter,
  enterpriseAdapter,
  children,
}) {
  const [fpsRequest, setFpsRequest] = useState(null);
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    const stored = readSubmissionState();
    const next = stored?.pipelineId === pipeline?.id
      ? stored
      : createSubmissionState(pipeline);

    setSubmission(next);
    setFpsRequest(readFpsRequest());
    writeSubmissionState(next);
  }, [pipeline]);

  const readiness = useMemo(
    () => evaluateSubmissionReadiness({
      approval,
      compliance,
      fpsRequest,
      submission,
    }),
    [approval, compliance, fpsRequest, submission]
  );

  const commit = useCallback((next, eventName) => {
    setSubmission(next);
    writeSubmissionState(next);
    publishSubmissionEvent(
      enterpriseAdapter,
      eventName,
      next
    );
    writeSubmissionAudit(
      enterpriseAdapter,
      eventName,
      next
    );
  }, [enterpriseAdapter]);

  const prepare = useCallback(() => {
    const next = createFpsRequest({
      pipeline,
      approval,
      employer,
      period,
    });

    setFpsRequest(next);
    writeFpsRequest(next);
  }, [pipeline, approval, employer, period]);

  const queue = useCallback(() => {
    if (!readiness.dispatchable) {
      throw new Error('Submission is not ready');
    }

    commit(
      { ...submission, status: 'queued' },
      'PayrollSubmissionQueued'
    );
  }, [readiness, submission, commit]);

  const dispatch = useCallback(async () => {
    if (!fpsRequest || submission?.status !== 'queued') {
      throw new Error('Submission must be queued first');
    }

    const next = await dispatchPayrollSubmission({
      submission,
      dispatchRequest: createDispatchRequest(fpsRequest),
      providerAdapter,
    });

    commit(next, 'PayrollSubmissionDispatched');
  }, [fpsRequest, submission, providerAdapter, commit]);

  const retry = useCallback(() => {
    if (!canRetrySubmission(submission)) {
      throw new Error('Submission is not retryable');
    }

    commit(
      { ...submission, status: 'queued' },
      'PayrollSubmissionRetryQueued'
    );
  }, [submission, commit]);

  const cancel = useCallback(() => {
    commit(
      { ...submission, status: 'cancelled' },
      'PayrollSubmissionCancelled'
    );
  }, [submission, commit]);

  const value = useMemo(() => ({
    fpsRequest,
    readiness,
    submission,
    retryable: canRetrySubmission(submission),
    prepare,
    queue,
    dispatch,
    retry,
    cancel,
  }), [
    fpsRequest,
    readiness,
    submission,
    prepare,
    queue,
    dispatch,
    retry,
    cancel,
  ]);

  return (
    <PayrollSubmissionContext.Provider value={value}>
      {children}
    </PayrollSubmissionContext.Provider>
  );
}

PayrollSubmissionProvider.propTypes = {
  pipeline: PropTypes.object,
  approval: PropTypes.object,
  compliance: PropTypes.object,
  employer: PropTypes.object,
  period: PropTypes.object,
  providerAdapter: PropTypes.shape({
    submitFps: PropTypes.func,
  }),
  enterpriseAdapter: PropTypes.shape({
    publishEvent: PropTypes.func,
    writeAudit: PropTypes.func,
  }),
  children: PropTypes.node.isRequired,
};
