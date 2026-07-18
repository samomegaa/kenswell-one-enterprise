'use strict';

module.exports = {
  ...require('./workspace-sections'),
  ...require('./workspace-schema-registry'),
  ...require('./field-types'),
  ...require('./field-definition'),
  ...require('./field-registry'),
  ...require('./default-payroll-fields'),
  ...require('./value-accessor'),
  ...require('./dynamic-field-renderer'),
  ...require('./default-control-renderers'),
  ...require('./create-canonical-workspace'),
};
