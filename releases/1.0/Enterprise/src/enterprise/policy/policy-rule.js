const { allowPolicy, denyPolicy } = require('./policy-decision');

class PolicyRule {
  constructor(name, evaluator, denyReason = 'policy denied') {
    if (!name || typeof name !== 'string') {
      throw new Error('policy rule name is required');
    }

    if (typeof evaluator !== 'function') {
      throw new Error('policy rule evaluator must be a function');
    }

    this.name = name;
    this.evaluator = evaluator;
    this.denyReason = denyReason;
  }

  async evaluate(context = {}) {
    const result = await this.evaluator(context);

    if (result === true) {
      return allowPolicy('allowed', {
        rule: this.name,
      });
    }

    if (result && typeof result === 'object' && Object.prototype.hasOwnProperty.call(result, 'allowed')) {
      return result;
    }

    return denyPolicy(typeof result === 'string' ? result : this.denyReason, {
      rule: this.name,
    });
  }
}

module.exports = {
  PolicyRule,
};
