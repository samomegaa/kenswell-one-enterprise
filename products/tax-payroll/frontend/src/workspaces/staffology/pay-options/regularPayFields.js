import {
  REGULAR_PAY_SCHEDULE_FIELDS,
} from './regularPayScheduleFields';

import {
  REGULAR_PAY_AMOUNT_FIELDS,
} from './regularPayAmountFields';

import {
  REGULAR_PAY_SETTINGS_FIELDS,
} from './regularPaySettingsFields';

export const REGULAR_PAY_FIELDS =
  Object.freeze({
    ...REGULAR_PAY_SCHEDULE_FIELDS,
    ...REGULAR_PAY_AMOUNT_FIELDS,
    ...REGULAR_PAY_SETTINGS_FIELDS,
  });
