import EnterpriseHealthCard from
  './enterprise-health/EnterpriseHealthCard';
import {
  calculateEnterpriseHealth,
} from './enterprise-health';
import OptimisationMetrics from
  './operational-optimisation/OptimisationMetrics';
import OptimisationRecommendationsPanel from
  './operational-optimisation/OptimisationRecommendationsPanel';
import {
  useOperationalOptimisation,
} from './operational-optimisation';
import SelfHealingPanel from
  './self-healing/SelfHealingPanel';
import { useSelfHealing } from './self-healing';

export default function PayrollOperationalOptimisationCentre() {
  const optimisation = useOperationalOptimisation();
  const selfHealing = useSelfHealing();

  const health = calculateEnterpriseHealth({
    runtime: 90,
    orchestration: 85,
    automation: 88,
    decision: 82,
    prediction: 80,
    recovery: selfHealing.latest ? 70 : 90,
    efficiency: optimisation.latest?.efficiency || 75,
    compliance: 95,
  });

  return (
    <section className="payroll-operational-optimisation-centre">
      <header>
        <div>
          <span>Enterprise resilience</span>
          <h2>Operational Optimisation & Self-Healing</h2>
        </div>
        <button type="button" onClick={optimisation.evaluate}>
          Evaluate optimisation
        </button>
      </header>

      <EnterpriseHealthCard health={health} />
      <OptimisationMetrics assessment={optimisation.latest} />
      <OptimisationRecommendationsPanel
        recommendations={
          optimisation.latest?.recommendations || []
        }
      />
      <SelfHealingPanel
        plan={selfHealing.latest}
        onEvaluate={selfHealing.evaluate}
        onRequest={selfHealing.requestRecovery}
      />
    </section>
  );
}
