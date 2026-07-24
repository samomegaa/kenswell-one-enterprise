import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { advancePipeline } from './advancePipeline';
import { configurePipeline } from './configurePipeline';
import { getPipelineMetrics } from './pipelineMetrics';
import { publishPipelineEvent, writePipelineAudit } from './pipelineEnterpriseAdapter';
import { PayrollPipelineContext } from './PayrollPipelineContext';
import { readPipeline, writePipeline } from './pipelineStorage';
import { restorePipeline } from './restorePipeline';

export function PayrollPipelineProvider({ execution, providerAdapter, enterpriseAdapter, children }) {
  const [pipeline, setPipeline] = useState(null);
  useEffect(() => {
    const next = restorePipeline(readPipeline(), execution);
    setPipeline(next); writePipeline(next);
  }, [execution]);
  const commit = useCallback((next, eventName) => {
    setPipeline(next); writePipeline(next);
    publishPipelineEvent(enterpriseAdapter, eventName, next);
    writePipelineAudit(enterpriseAdapter, eventName, next);
  }, [enterpriseAdapter]);
  const loadEmployees = useCallback((employees = []) => {
    if (pipeline) commit(configurePipeline(pipeline, employees), 'PayrollPipelineEmployeesLoaded');
  }, [pipeline, commit]);
  const advance = useCallback(async () => {
    const next = await advancePipeline(pipeline, providerAdapter);
    commit(next, 'PayrollPipelineAdvanced');
  }, [pipeline, providerAdapter, commit]);
  const pause = useCallback(() => commit(pipeline && { ...pipeline, status: 'paused' }, 'PayrollPipelinePaused'), [pipeline, commit]);
  const resume = useCallback(() => commit(pipeline && { ...pipeline, status: 'running' }, 'PayrollPipelineResumed'), [pipeline, commit]);
  const cancel = useCallback(() => commit(pipeline && { ...pipeline, status: 'cancelled' }, 'PayrollPipelineCancelled'), [pipeline, commit]);
  const value = useMemo(() => ({ pipeline, metrics: getPipelineMetrics(pipeline), loadEmployees, advance, pause, resume, cancel }), [pipeline, loadEmployees, advance, pause, resume, cancel]);
  return <PayrollPipelineContext.Provider value={value}>{children}</PayrollPipelineContext.Provider>;
}
PayrollPipelineProvider.propTypes = {
  execution: PropTypes.object,
  providerAdapter: PropTypes.shape({ executePayrollJob: PropTypes.func }),
  enterpriseAdapter: PropTypes.shape({ publishEvent: PropTypes.func, writeAudit: PropTypes.func }),
  children: PropTypes.node.isRequired,
};
