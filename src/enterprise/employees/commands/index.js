module.exports = {
  ...require('./employee-command-types'),
  ...require('./employee-command'),
  ...require('./employee-command-validator'),
  ...require('./employee-command-result'),
  ...require('./employee-command-registry'),
  ...require('./employee-command-dispatcher'),
};
