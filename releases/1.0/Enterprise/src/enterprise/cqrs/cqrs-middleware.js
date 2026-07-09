const { defaultCommandBus } = require('./command-bus');
const { defaultQueryBus } = require('./query-bus');

function enterpriseCqrsMiddleware({
  commandBus = defaultCommandBus,
  queryBus = defaultQueryBus,
} = {}) {
  return function attachEnterpriseCqrs(req, res, next) {
    req.commandBus = commandBus;
    req.queryBus = queryBus;
    return next();
  };
}

module.exports = {
  enterpriseCqrsMiddleware,
};
