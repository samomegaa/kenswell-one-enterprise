const {
  Command,
  CommandBus,
  defaultCommandBus,
  CommandNotFoundError,
  Query,
  QueryBus,
  defaultQueryBus,
  QueryNotFoundError,
  cqrsSuccess,
  cqrsFailure,
  enterpriseCqrsMiddleware,
} = require('../../../src/enterprise/cqrs');

const core = require('../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  defaultCommandBus.clear();
  defaultQueryBus.clear();

  const command = new Command('customer.create', async (context) => {
    return {
      id: 'customer_001',
      name: context.input.name,
      changed: true,
    };
  });

  const commandResult = await command.execute({
    input: {
      name: 'Kenswell Customer',
    },
  });

  assert(commandResult.ok === true, 'command should succeed');
  assert(commandResult.data.changed === true, 'command result mismatch');
  assert(Object.isFrozen(commandResult), 'command result should be immutable');

  const failingCommand = new Command('customer.fail', async () => {
    throw new Error('expected command failure');
  });

  const failingCommandResult = await failingCommand.execute();

  assert(failingCommandResult.ok === false, 'failing command should return failure');
  assert(failingCommandResult.error.name === 'CommandExecutionError', 'wrong command failure type');

  const commandBus = new CommandBus();

  commandBus.register(command.name, command);
  commandBus.register('customer.update', async (context) => {
    return cqrsSuccess({
      id: context.input.id,
      updated: true,
    });
  });

  assert(commandBus.has('customer.create'), 'command bus missing registered command');
  assert(commandBus.list().length === 2, 'command bus list mismatch');

  const busCommandResult = await commandBus.execute('customer.update', {
    input: {
      id: 'customer_001',
    },
  });

  assert(busCommandResult.ok === true, 'command bus execution failed');
  assert(busCommandResult.data.updated === true, 'command bus result mismatch');

  try {
    commandBus.get('missing.command');
    throw new Error('missing command should throw');
  } catch (error) {
    assert(error instanceof CommandNotFoundError, 'wrong missing command error type');
  }

  const query = new Query('customer.get', async (context) => {
    return {
      id: context.input.id,
      name: 'Kenswell Customer',
      readOnly: true,
    };
  });

  const queryResult = await query.execute({
    input: {
      id: 'customer_001',
    },
  });

  assert(queryResult.ok === true, 'query should succeed');
  assert(queryResult.data.readOnly === true, 'query result mismatch');

  const queryBus = new QueryBus();

  queryBus.register(query.name, query);
  queryBus.register('customer.list', async () => {
    return cqrsSuccess([
      {
        id: 'customer_001',
      },
    ]);
  });

  assert(queryBus.has('customer.get'), 'query bus missing registered query');
  assert(queryBus.list().length === 2, 'query bus list mismatch');

  const listResult = await queryBus.execute('customer.list');

  assert(listResult.ok === true, 'query bus execution failed');
  assert(Array.isArray(listResult.data), 'query bus list result mismatch');

  try {
    queryBus.get('missing.query');
    throw new Error('missing query should throw');
  } catch (error) {
    assert(error instanceof QueryNotFoundError, 'wrong missing query error type');
  }

  const explicitSuccess = cqrsSuccess({ ok: true });
  const explicitFailure = cqrsFailure(new Error('explicit failure'));

  assert(explicitSuccess.ok === true, 'cqrsSuccess invalid');
  assert(explicitFailure.ok === false, 'cqrsFailure invalid');

  defaultCommandBus.register('default.command', async () => cqrsSuccess({ default: true }));
  defaultQueryBus.register('default.query', async () => cqrsSuccess({ default: true }));

  assert(defaultCommandBus.has('default.command'), 'default command bus failed');
  assert(defaultQueryBus.has('default.query'), 'default query bus failed');

  assert(typeof enterpriseCqrsMiddleware === 'function', 'CQRS middleware not exported');
  assert(core.cqrs, 'cqrs not exported from core');
  assert(typeof core.cqrs.CommandBus === 'function', 'core CommandBus export invalid');
  assert(typeof core.cqrs.QueryBus === 'function', 'core QueryBus export invalid');

  console.log('✅ Enterprise Command and Query Boundary verification passed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
