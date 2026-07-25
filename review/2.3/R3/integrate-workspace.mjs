import fs from 'node:fs';

const file = process.argv[2];
if (!file) throw new Error('Workspace path is required');

let source = fs.readFileSync(file, 'utf8');

const required = [
  'PayrollDecisionIntelligenceProvider',
  'PayrollPredictiveIntelligenceProvider',
  'PayrollCommandProvider',
];

for (const marker of required) {
  if (!source.includes(marker)) {
    throw new Error(`2.3-R2 workspace marker missing: ${marker}`);
  }
}

if (source.includes('EnterpriseIntelligenceWorkspace')) {
  throw new Error('2.3-R3 workspace integration already exists');
}

const importAnchor =
  "import PayrollDecisionIntelligenceCentre from\n" +
  "  './PayrollDecisionIntelligenceCentre';";

if (!source.includes(importAnchor)) {
  throw new Error('Decision Centre import anchor not found');
}

source = source.replace(
  importAnchor,
  "import EnterpriseIntelligenceWorkspace from\n" +
  "  './EnterpriseIntelligenceWorkspace';"
);

const cssAnchor =
  "import './payroll-predictive-intelligence-centre.css';";

if (!source.includes(cssAnchor)) {
  throw new Error('Predictive CSS anchor not found');
}

source = source.replace(
  cssAnchor,
  cssAnchor + "\n" +
  "import './enterprise-intelligence-workspace.css';\n" +
  "import './payroll-operational-optimisation-centre.css';"
);

const centrePattern =
  /<PayrollDecisionIntelligenceCentre\s*\/>\s*<PayrollPredictiveIntelligenceCentre\s*\/>/;

if (!centrePattern.test(source)) {
  throw new Error('Intelligence centre composition anchor not found');
}

source = source.replace(
  centrePattern,
  `<EnterpriseIntelligenceWorkspace
          optimisationSnapshot={{
            throughput: operations.metrics?.throughput || 10,
            queueDepth: operations.snapshot?.queueDepth || 0,
            retryCount: orchestration.metrics?.retries || 0,
            approvalLatency:
              operations.snapshot?.approvalLatency || 0,
            queues: operations.snapshot?.queues || [],
          }}
          selfHealingSnapshot={{
            stalled: Boolean(operations.snapshot?.stalled),
            retryCount: orchestration.metrics?.retries || 0,
            dependencyFailure: Boolean(
              operations.snapshot?.dependencyFailure
            ),
            queueStarved: Boolean(
              operations.snapshot?.queueStarved
            ),
            dependencies:
              operations.snapshot?.dependencies || [],
            checkpoint:
              operations.snapshot?.checkpoint || null,
            affectedResources:
              operations.snapshot?.affectedResources || [],
          }}
          forecast={predictive.latest}
          commandApi={commandApi}
        />`
);

fs.writeFileSync(file, source);
