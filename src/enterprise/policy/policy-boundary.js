const { PolicyRule } = require('./policy-rule');
const { allowPolicy, denyPolicy } = require('./policy-decision');

class PolicyBoundary {
  constructor(name = 'policy.boundary') {
    this.name = name;
    this.rules = [];
  }

  addRule(rule, evaluator, denyReason) {
    const policyRule = rule instanceof PolicyRule
      ? rule
      : new PolicyRule(rule, evaluator, denyReason);

    this.rules.push(policyRule);
    return this;
  }

  async evaluate(context = {}) {
    const decisions = [];

    for (const rule of this.rules) {
      const decision = await rule.evaluate(context);
      decisions.push(decision);

      if (!decision.allowed) {
        return denyPolicy(decision.reason, {
          boundary: this.name,
          ruleCount: this.rules.length,
          decisions,
        });
      }
    }

    return allowPolicy('all policies allowed', {
      boundary: this.name,
      ruleCount: this.rules.length,
      decisions,
    });
  }
}

module.exports = {
  PolicyBoundary,
};
