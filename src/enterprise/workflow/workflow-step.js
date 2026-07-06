class WorkflowStep {
  constructor(name, handler) {
    if (!name || typeof name !== 'string') {
      throw new Error('WorkflowStep name is required');
    }

    if (typeof handler !== 'function') {
      throw new Error('WorkflowStep handler must be a function');
    }

    this.name = name;
    this.handler = handler;
  }

  async execute(context) {
    return this.handler(context);
  }
}

module.exports = {
  WorkflowStep,
};
