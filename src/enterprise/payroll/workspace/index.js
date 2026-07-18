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
  ...require('./readiness-levels'),
  ...require('./readiness-value'),
  ...require('./readiness-result'),
  ...require('./readiness-engine'),
  ...require('./section-readiness'),
  ...require('./readiness-dashboard'),
  ...require('./create-canonical-workspace'),
};
