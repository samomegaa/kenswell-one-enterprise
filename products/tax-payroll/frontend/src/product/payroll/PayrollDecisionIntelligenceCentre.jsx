import DecisionActionPanel from
  './decision-intelligence/DecisionActionPanel';
import DecisionCentreHeader from
  './decision-intelligence/DecisionCentreHeader';
import DecisionEvidencePanel from
  './decision-intelligence/DecisionEvidencePanel';
import DecisionHistoryPanel from
  './decision-intelligence/DecisionHistoryPanel';
import DecisionMetrics from
  './decision-intelligence/DecisionMetrics';
import PolicyEvaluationPanel from
  './decision-intelligence/PolicyEvaluationPanel';

import {
  usePayrollDecisionIntelligence,
} from './decision-intelligence';

export default function PayrollDecisionIntelligenceCentre() {
  const intelligence = usePayrollDecisionIntelligence();

  return (
    <section className="payroll-decision-intelligence-centre">
      <DecisionCentreHeader />
      <DecisionMetrics decision={intelligence.latest} />

      <div className="payroll-decision-intelligence-centre__grid">
        <DecisionEvidencePanel
          decision={intelligence.latest}
        />
        <PolicyEvaluationPanel
          decision={intelligence.latest}
        />
      </div>

      <DecisionActionPanel
        decision={intelligence.latest}
        onEvaluate={intelligence.evaluate}
        onRequest={intelligence.requestStrategy}
      />

      <DecisionHistoryPanel history={intelligence.history} />
    </section>
  );
}
