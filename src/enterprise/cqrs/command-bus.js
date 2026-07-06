const { Command } = require('./command');
const { CommandNotFoundError } = require('./cqrs-errors');

class CommandBus {
  constructor() {
    this.commands = new Map();
  }

  register(name, handler) {
    const command = handler instanceof Command
      ? handler
      : new Command(name, handler);

    this.commands.set(command.name, command);
    return command;
  }

  has(commandName) {
    return this.commands.has(commandName);
  }

  get(commandName) {
    const command = this.commands.get(commandName);

    if (!command) {
      throw new CommandNotFoundError(commandName);
    }

    return command;
  }

  list() {
    return Array.from(this.commands.keys());
  }

  async execute(commandName, context = {}) {
    const command = this.get(commandName);
    return command.execute(context);
  }

  clear() {
    this.commands.clear();
  }
}

const defaultCommandBus = new CommandBus();

module.exports = {
  CommandBus,
  defaultCommandBus,
};
