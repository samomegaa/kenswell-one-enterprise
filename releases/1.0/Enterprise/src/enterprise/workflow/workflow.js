const { UnitOfWork } = require('./unit-of-work');

class EnterpriseWorkflow {
  constructor(workflowContext) {
    this.workflowContext = workflowContext;
    this.unitOfWork = new UnitOfWork(workflowContext);
  }

  addStep(step) {
    this.unitOfWork.addStep(step);
    return this;
  }

  addCompensation(handler) {
    this.unitOfWork.addCompensation(handler);
    return this;
  }

  async execute() {
    return this.unitOfWork.execute();
  }
}

module.exports = {
  EnterpriseWorkflow,
};
