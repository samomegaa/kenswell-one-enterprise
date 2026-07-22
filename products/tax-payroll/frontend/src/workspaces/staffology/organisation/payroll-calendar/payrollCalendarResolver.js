import {
  firstValue,
  resolveCollection,
} from '../organisationCollectionResolver';

import {
  PAYROLL_CALENDAR_PATHS,
  PAYROLL_PERIOD_FIELDS,
} from './payrollCalendarFields';

function normaliseCalendarValue(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (value && Array.isArray(value.items)) {
    return value.items;
  }

  if (value && Array.isArray(value.periods)) {
    return value.periods;
  }

  return null;
}

export function resolvePayrollCalendar(source) {
  for (const path of PAYROLL_CALENDAR_PATHS) {
    const resolved = resolveCollection(
      source,
      [path]
    );

    if (resolved.available) {
      return resolved;
    }

    const parts = path.split('.');
    const value = parts.reduce(
      (current, key) => current?.[key],
      source
    );

    const items = normaliseCalendarValue(value);

    if (items) {
      return {
        available: true,
        items,
        sourcePath: path,
      };
    }
  }

  return {
    available: false,
    items: [],
    sourcePath: null,
  };
}

export function resolvePayrollPeriodField(
  source,
  field
) {
  return firstValue(
    source,
    PAYROLL_PERIOD_FIELDS[field] || []
  );
}
