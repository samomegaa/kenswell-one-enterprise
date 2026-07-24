import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import PropTypes from 'prop-types';

import { evaluateCompliance } from '../compliance';
import {
  getValidationSummary,
  normaliseValidationResults,
} from '../validation';
import {
  PayrollGovernanceContext,
} from './PayrollGovernanceContext';
import { createApprovalState } from './createApprovalState';
import {
  decidePayrollApproval,
} from './decidePayrollApproval';
import {
  publishGovernanceEvent,
  writeGovernanceAudit,
} from './governanceEnterpriseAdapter';
import {
  readGovernanceState,
  writeGovernanceState,
} from './governanceStorage';

export function PayrollGovernanceProvider({
  pipeline,
  enterpriseAdapter,
  children,
}) {
  const [findings, setFindings] = useState([]);
  const [approval, setApproval] = useState(null);

  useEffect(() => {
    const stored = readGovernanceState();
    const next = stored?.pipelineId === pipeline?.id
      ? stored
      : createApprovalState(pipeline);

    setApproval(next);
    writeGovernanceState(next);
  }, [pipeline]);

  const summary = useMemo(
    () => getValidationSummary(findings),
    [findings]
  );

  const compliance = useMemo(
    () => evaluateCompliance(summary),
    [summary]
  );

  const loadFindings = useCallback((results = []) => {
    setFindings(normaliseValidationResults(results));
  }, []);

  const commitDecision = useCallback((decision) => {
    if (decision === 'approved' && !compliance.approvable) {
      throw new Error('Payroll is not ready for approval');
    }

    const next = decidePayrollApproval(
      approval,
      decision
    );

    setApproval(next);
    writeGovernanceState(next);
    publishGovernanceEvent(
      enterpriseAdapter,
      `Payroll${decision}`,
      next
    );
    writeGovernanceAudit(
      enterpriseAdapter,
      `Payroll${decision}`,
      next
    );
  }, [approval, compliance, enterpriseAdapter]);

  const value = useMemo(() => ({
    findings,
    summary,
    compliance,
    approval,
    loadFindings,
    approve: () => commitDecision('approved'),
    reject: () => commitDecision('rejected'),
  }), [
    findings,
    summary,
    compliance,
    approval,
    loadFindings,
    commitDecision,
  ]);

  return (
    <PayrollGovernanceContext.Provider value={value}>
      {children}
    </PayrollGovernanceContext.Provider>
  );
}

PayrollGovernanceProvider.propTypes = {
  pipeline: PropTypes.object,
  enterpriseAdapter: PropTypes.shape({
    publishEvent: PropTypes.func,
    writeAudit: PropTypes.func,
  }),
  children: PropTypes.node.isRequired,
};
