const { CommandExecutionError } = require('./cqrs-errors');
const { cqrsSuccess, cqrsFailure } = require('./cqrs-result');

class Command {
  constructor(name, handler) {
    if (!name || typeof name !== 'string') {
      throw new CommandExecutionError('unknown', new Error('command name is required'));
    }

    if (typeof handler !== 'function') {
      throw new CommandExecutionError(name, new Error('command handler must be a function'));
    }

    this.name = name;
    this.handler = handler;
  }

  async execute(context = {}) {
    try {
      const result = await this.handler(context);

      if (result && typeof result === 'object' && Object.prototype.hasOwnProperty.call(result, 'ok')) {
        return result;
      }

      return cqrsSuccess(result, {
        commandName: this.name,
      });
    } catch (error) {
      return cqrsFailure(new CommandExecutionError(this.name, error), {
        commandName: this.name,
      });
    }
  }
}

module.exports = {
  Command,
};
