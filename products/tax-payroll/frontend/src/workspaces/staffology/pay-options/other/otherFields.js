import {
  OTHER_IDENTITY_FIELDS,
} from './otherIdentityFields';

import {
  OTHER_WORKING_FIELDS,
} from './otherWorkingFields';

import {
  OTHER_REPORTING_FIELDS,
} from './otherReportingFields';

export const OTHER_FIELDS = Object.freeze({
  ...OTHER_IDENTITY_FIELDS,
  ...OTHER_WORKING_FIELDS,
  ...OTHER_REPORTING_FIELDS,
});
