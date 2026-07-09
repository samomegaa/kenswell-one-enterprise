const { WorkflowExecutionError, UnitOfWorkError } = require('./workflow-errors');

class UnitOfWork {
  constructor(workflowContext) {
    if (!workflowContext || typeof workflowContext !== 'object') {
      throw new UnitOfWorkError('workflowContext is required');
    }

    this.workflowContext = workflowContext;
    this.steps = [];
    this.completed = [];
    this.compensations = [];
    this.committed = false;
    this.rolledBack = false;
  }

  addStep(step) {
    if (!step || typeof step.execute !== 'function') {
      throw new UnitOfWorkError('step must expose execute(context)');
    }

    this.steps.push(step);
    return this;
  }

  addCompensation(handler) {
    if (typeof handler !== 'function') {
      throw new UnitOfWorkError('compensation handler must be a function');
    }

    this.compensations.push(handler);
    return this;
  }

  async commit() {
    this.committed = true;

    return {
      committed: true,
      workflowId: this.workflowContext.workflowId,
      completedSteps: this.completed.map((step) => step.name),
    };
  }

  async rollback(cause) {
    this.rolledBack = true;

    const executed = [];

    for (const handler of [...this.compensations].reverse()) {
      await handler({
        workflowContext: this.workflowContext,
        cause,
      });

      executed.push(handler.name || 'anonymous');
    }

    return {
      rolledBack: true,
      workflowId: this.workflowContext.workflowId,
      compensationsExecuted: executed,
    };
  }

  async execute() {
    try {
      for (const step of this.steps) {
        await step.execute(this.workflowContext);
        this.completed.push(step);
      }

      return this.commit();
    } catch (error) {
      await this.rollback(error);

      const failedStep = this.steps[this.completed.length];

      throw new WorkflowExecutionError(
        failedStep?.name || 'unknown',
        error
      );
    }
  }
}

module.exports = {
  UnitOfWork,
};
