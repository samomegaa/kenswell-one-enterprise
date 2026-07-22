import {
  firstValue,
} from '../organisationCollectionResolver';

import {
  DASHBOARD_EMPLOYEE_COUNT_PATHS,
  DASHBOARD_HEALTH_PATHS,
  DASHBOARD_STATUS_PATHS,
} from './dashboardContract';

export function resolveDashboardSource(input) {
  return (
    input?.employer ||
    input?.organisation ||
    input?.organization ||
    input ||
    {}
  );
}

export function resolveDashboardEmployeeCount(source) {
  return firstValue(
    source,
    DASHBOARD_EMPLOYEE_COUNT_PATHS
  );
}

export function resolveDashboardStatus(source) {
  return firstValue(source, DASHBOARD_STATUS_PATHS);
}

export function resolveDashboardHealth(source) {
  return firstValue(source, DASHBOARD_HEALTH_PATHS);
}
