class EnterprisePipeline {
  constructor(name = 'enterprise.pipeline') {
    this.name = name;
    this.steps = [];
  }

  use(name, handler) {
    if (!name || typeof name !== 'string') {
      throw new Error('pipeline step name is required');
    }

    if (typeof handler !== 'function') {
      throw new Error(`pipeline step handler must be a function: ${name}`);
    }

    this.steps.push({ name, handler });
    return this;
  }

  async execute(initialContext = {}) {
    const execution = {
      pipeline: this.name,
      steps: [],
      context: {
        ...initialContext,
      },
    };

    for (const step of this.steps) {
      const startedAt = Date.now();

      const result = await step.handler(execution.context);

      if (result && typeof result === 'object') {
        execution.context = {
          ...execution.context,
          ...result,
        };
      }

      execution.steps.push({
        name: step.name,
        durationMs: Date.now() - startedAt,
        completed: true,
      });
    }

    return Object.freeze({
      ok: true,
      pipeline: this.name,
      steps: execution.steps,
      context: execution.context,
    });
  }

  listSteps() {
    return this.steps.map((step) => step.name);
  }
}

module.exports = {
  EnterprisePipeline,
};
