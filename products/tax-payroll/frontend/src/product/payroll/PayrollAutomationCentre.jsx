import AutomationCentreHeader from
  './automation-centre/AutomationCentreHeader';

import AutomationHistoryCard from
  './automation-centre/AutomationHistoryCard';

import AutomationMetricGrid from
  './automation-centre/AutomationMetricGrid';

import AutomationRuleGrid from
  './automation-centre/AutomationRuleGrid';

import SlaHealthCard from
  './automation-centre/SlaHealthCard';

import {
  usePayrollAutomation,
} from './automation-centre';

export default function PayrollAutomationCentre() {
  const automation = usePayrollAutomation();

  return (
    <section className="payroll-automation-centre">
      <AutomationCentreHeader />

      <AutomationMetricGrid
        metrics={automation.metrics}
      />

      <AutomationRuleGrid
        rules={automation.evaluations}
        resolvePlaybook={automation.resolvePlaybook}
        onRun={automation.runRule}
      />

      <div className="payroll-automation-centre__footer">
        <SlaHealthCard sla={automation.sla} />
        <AutomationHistoryCard
          history={automation.history}
        />
      </div>
    </section>
  );
}
