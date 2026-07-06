class EnterpriseWorkflowError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseWorkflowError';
    this.details = details;
    this.statusCode = 500;
  }
}

class WorkflowExecutionError extends EnterpriseWorkflowError {
  constructor(step, cause) {
    super(`Workflow step failed: ${step}`, {
      step,
      cause: cause?.message,
    });

    this.name = 'WorkflowExecutionError';
  }
}

class UnitOfWorkError extends EnterpriseWorkflowError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'UnitOfWorkError';
  }
}

module.exports = {
  EnterpriseWorkflowError,
  WorkflowExecutionError,
  UnitOfWorkError,
};