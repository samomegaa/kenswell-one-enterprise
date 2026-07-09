const { Command } = require('./command');
const { CommandBus, defaultCommandBus } = require('./command-bus');

const { Query } = require('./query');
const { QueryBus, defaultQueryBus } = require('./query-bus');

const {
  cqrsSuccess,
  cqrsFailure,
} = require('./cqrs-result');

const { enterpriseCqrsMiddleware } = require('./cqrs-middleware');

const {
  EnterpriseCqrsError,
  CommandExecutionError,
  QueryExecutionError,
  CommandNotFoundError,
  QueryNotFoundError,
} = require('./cqrs-errors');

module.exports = {
  Command,
  CommandBus,
  defaultCommandBus,

  Query,
  QueryBus,
  defaultQueryBus,

  cqrsSuccess,
  cqrsFailure,

  enterpriseCqrsMiddleware,

  EnterpriseCqrsError,
  CommandExecutionError,
  QueryExecutionError,
  CommandNotFoundError,
  QueryNotFoundError,
};
