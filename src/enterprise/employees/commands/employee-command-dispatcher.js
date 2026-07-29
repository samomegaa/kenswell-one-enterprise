const {
  CommandBus,
} = require('../../cqrs');

const {
  validateEmployeeCommand,
} = require('./employee-command-validator');

const {
  employeeCommandAccepted,
} = require('./employee-command-result');

function createEmployeeCommandDispatcher({
  commandBus = new CommandBus(),
} = {}) {
  const handler = async ({ command }) => {
    const validation = validateEmployeeCommand(command);

    if (!validation.valid) {
      throw new Error(validation.errors.join('; '));
    }

    return employeeCommandAccepted(command);
  };

  return {
    register(type) {
      if (!commandBus.has(type)) {
        commandBus.register(type, handler);
      }
      return this;
    },

    async dispatch(command) {
      return commandBus.execute(
        command.type,
        { command }
      );
    },

    commandBus,
  };
}

module.exports = { createEmployeeCommandDispatcher };
