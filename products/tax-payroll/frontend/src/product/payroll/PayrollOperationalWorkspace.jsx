import PropTypes from 'prop-types';

import StaffologyPayrollRunWorkspace from
  '../../workspaces/staffology/payroll-run/StaffologyPayrollRunWorkspace';

import EmployerPayrollContext from './EmployerPayrollContext';
import PayrollActivityCentre from './PayrollActivityCentre';
import PayrollCompletionCard from './PayrollCompletionCard';
import PayrollExecutionCard from './PayrollExecutionCard';
import PayrollGovernanceCard from './PayrollGovernanceCard';
import PayrollOperationsCentre from './PayrollOperationsCentre';
import PayrollPeriodCard from './PayrollPeriodCard';
import PayrollPipelineCard from './PayrollPipelineCard';
import PayrollRuntimeCard from './PayrollRuntimeCard';
import PayrollRuntimeRequired from './PayrollRuntimeRequired';
import PayrollSubmissionCard from './PayrollSubmissionCard';
import PayrollWorkflowRail from './PayrollWorkflowRail';
import PayrollWorkspaceHeader from './PayrollWorkspaceHeader';

import {
  PAYROLL_WORKFLOW_STAGES,
  getPayrollWorkflowSummary,
} from './payrollWorkflow';

import {
  PayrollActivityProvider,
} from './activity-centre';
import { usePayrollGovernance } from './approval';
import { usePayrollCompletion } from './completion';
import { usePayrollOrchestrator } from './orchestrator';
import {
  PayrollOperationsProvider,
  usePayrollOperations,
} from './operations';
import { usePayrollPeriod } from './period';
import { usePayrollPipeline } from './pipeline';
import { usePayrollSession } from './session';
import { usePayrollSubmission } from './submission';

import './payroll-operational-workspace.css';
import './payroll-operational-layout.css';
import './payroll-operational-responsive.css';
import './payroll-runtime-card.css';
import './payroll-period-card.css';
import './payroll-execution-card.css';
import './payroll-pipeline-card.css';
import './payroll-governance-card.css';
import './payroll-submission-card.css';
import './payroll-completion-card.css';
import './payroll-operations-centre.css';
import './payroll-activity-centre.css';

function OperationsLayer() {
  const operations = usePayrollOperations();

  return (
    <>
      <PayrollOperationsCentre />

      <PayrollActivityProvider
        snapshot={operations.snapshot}
        exceptions={operations.exceptions}
      >
        <PayrollActivityCentre />
      </PayrollActivityProvider>
    </>
  );
}

export default function PayrollOperationalWorkspace({
  context,
}) {
  const summary = getPayrollWorkflowSummary();
  const sessionState = usePayrollSession();
  const periodState = usePayrollPeriod();
  const orchestrator = usePayrollOrchestrator();
  const pipelineState = usePayrollPipeline();
  const governance = usePayrollGovernance();
  const submission = usePayrollSubmission();
  const completion = usePayrollCompletion();

  const operational =
    sessionState.active && periodState.active;

  return (
    <section className="payroll-operational-workspace">
      <PayrollWorkspaceHeader summary={summary} />
      <EmployerPayrollContext context={context} />

      <PayrollOperationsProvider
        session={sessionState}
        period={periodState}
        pipeline={pipelineState.pipeline}
        governance={governance}
        submission={submission.submission}
        completion={completion}
      >
        <OperationsLayer />
      </PayrollOperationsProvider>

      <PayrollRuntimeCard
        session={sessionState.session}
        active={sessionState.active}
        onDeactivate={sessionState.deactivate}
      />

      <PayrollPeriodCard
        period={periodState.period}
        active={periodState.active}
        onClose={periodState.close}
      />

      <PayrollExecutionCard
        execution={orchestrator.execution}
        nextState={orchestrator.nextState}
        onAdvance={orchestrator.advance}
        onPause={orchestrator.pause}
        onResume={orchestrator.resume}
        onCancel={orchestrator.cancel}
      />

      <PayrollPipelineCard
        pipeline={pipelineState.pipeline}
        metrics={pipelineState.metrics}
        onAdvance={pipelineState.advance}
        onPause={pipelineState.pause}
        onResume={pipelineState.resume}
        onCancel={pipelineState.cancel}
      />

      <PayrollGovernanceCard
        summary={governance.summary}
        compliance={governance.compliance}
        approval={governance.approval}
        onApprove={governance.approve}
        onReject={governance.reject}
      />

      <PayrollSubmissionCard
        fpsRequest={submission.fpsRequest}
        readiness={submission.readiness}
        submission={submission.submission}
        retryable={submission.retryable}
        onPrepare={submission.prepare}
        onQueue={submission.queue}
        onDispatch={submission.dispatch}
        onRetry={submission.retry}
        onCancel={submission.cancel}
      />

      <PayrollCompletionCard
        response={completion.response}
        reconciliation={completion.reconciliation}
        completion={completion.completion}
        metrics={completion.metrics}
        archiveEligibility={completion.archiveEligibility}
        onRefresh={completion.refresh}
        onReconcile={completion.reconcile}
        onComplete={completion.complete}
        onArchive={completion.archive}
      />

      <PayrollWorkflowRail
        stages={PAYROLL_WORKFLOW_STAGES}
        activeId={
          orchestrator.execution?.state ||
          periodState.stage
        }
      />

      <div className="payroll-operational-workspace__content">
        {operational &&
        sessionState.session?.runtimeWorkspace ? (
          <StaffologyPayrollRunWorkspace
            runtimeWorkspace={
              sessionState.session.runtimeWorkspace
            }
          />
        ) : (
          <PayrollRuntimeRequired />
        )}
      </div>
    </section>
  );
}

PayrollOperationalWorkspace.propTypes = {
  context: PropTypes.object.isRequired,
};
