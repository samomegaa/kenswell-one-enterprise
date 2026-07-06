const { allowSecurity, denySecurity } = require('./security-decision');

class RequestGuard {
  constructor(name = 'request.guard') {
    this.name = name;
    this.rules = [];
  }

  addRule(name, evaluator, denyReason = 'request guard denied') {
    if (!name || typeof name !== 'string') {
      throw new Error('request guard rule name is required');
    }

    if (typeof evaluator !== 'function') {
      throw new Error('request guard evaluator must be a function');
    }

    this.rules.push({
      name,
      evaluator,
      denyReason,
    });

    return this;
  }

  async evaluate(req = {}) {
    const decisions = [];

    for (const rule of this.rules) {
      const result = await rule.evaluator(req);

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

    return allowSecurity('request guard allowed', {
      guard: this.name,
      decisions,
    });
  }
}

module.exports = {
  RequestGuard,
};
