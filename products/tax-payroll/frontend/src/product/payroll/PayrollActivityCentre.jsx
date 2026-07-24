import ActivityCentreHeader from
  './activity-centre/ActivityCentreHeader';

import ActivityTimeline from
  './activity-centre/ActivityTimeline';

import ActivityTimelineFilters from
  './activity-centre/ActivityTimelineFilters';

import DiagnosticsSummaryCard from
  './activity-centre/DiagnosticsSummaryCard';

import {
  usePayrollActivity,
} from './activity-centre';

export default function PayrollActivityCentre() {
  const activity = usePayrollActivity();

  return (
    <section className="payroll-activity-centre">
      <ActivityCentreHeader
        summary={activity.summary}
        diagnostics={activity.diagnostics}
      />

      <ActivityTimelineFilters
        filter={activity.filter}
        query={activity.query}
        onFilterChange={activity.setFilter}
        onQueryChange={activity.setQuery}
      />

      <div className="payroll-activity-centre__layout">
        <ActivityTimeline
          entries={activity.visibleActivity}
        />

        <DiagnosticsSummaryCard
          diagnostics={activity.diagnostics}
        />
      </div>
    </section>
  );
}
