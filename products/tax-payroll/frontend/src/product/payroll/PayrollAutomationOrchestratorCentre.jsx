import ExecutionQueuePanel from
  './automation-orchestrator/ExecutionQueuePanel';
import OrchestratorHeader from
  './automation-orchestrator/OrchestratorHeader';
import OrchestratorMetrics from
  './automation-orchestrator/OrchestratorMetrics';
import RunbookLaunchGrid from
  './automation-orchestrator/RunbookLaunchGrid';
import {
  usePayrollAutomationOrchestrator,
} from './automation-orchestrator';

export default function PayrollAutomationOrchestratorCentre() {
  const orchestrator = usePayrollAutomationOrchestrator();

  return (
    <section className="payroll-automation-orchestrator-centre">
      <OrchestratorHeader />
      <OrchestratorMetrics metrics={orchestrator.metrics} />
      <RunbookLaunchGrid
        runbooks={orchestrator.runbooks}
        onLaunch={orchestrator.launchRunbook}
      />
      <ExecutionQueuePanel
        executions={orchestrator.executions}
        onRequest={orchestrator.requestNextCommand}
      />
    </section>
  );
}
