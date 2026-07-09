const { createEnterpriseScheduler } = require('./scheduler');

function enterpriseSchedulerMiddleware(scheduler = createEnterpriseScheduler()) {
  return function attachEnterpriseScheduler(req, res, next) {
    req.scheduler = scheduler;
    return next();
  };
}

module.exports = {
  enterpriseSchedulerMiddleware,
};
