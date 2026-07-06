const { allowSecurity, denySecurity } = require('./security-decision');

class RuntimeGuard {
  constructor(name = 'runtime.guard') {
    this.name = name;
    this.rules = [];
  }

  addRule(name, evaluator, denyReason = 'runtime guard denied') {
    if (!name || typeof name !== 'string') {
      throw new Error('runtime guard rule name is required');
    }

    if (typeof evaluator !== 'function') {
      throw new Error('runtime guard evaluator must be a function');
    }

    this.rules.push({
      name,
      evaluator,
      denyReason,
    });

    return this;
  }

  async evaluate(context = {}) {
    const decisions = [];

    for (const rule of this.rules) {
      const result = await rule.evaluator(context);

      const decision = result === true
        ? allowSecurity('allowed', { rule: rule.name })
        : denySecurity(typeof result === 'string' ? result : rule.denyReason, { rule: rule.name });

      decisions.push(decision);

      if (!decision.allowed) {
        return denySecurity(decision.reason, {
          guard: this.name,
          decisions,
        });
      }
    }

    return allowSecurity('runtime guard allowed', {
      guard: this.name,
      decisions,
    });
  }
}

module.exports = {
  RuntimeGuard,
};
