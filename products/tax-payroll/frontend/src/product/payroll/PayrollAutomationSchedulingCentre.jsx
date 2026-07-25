import EventWorkflowCard from
  './automation-scheduling/EventWorkflowCard';

import ExecutionPlanHistory from
  './automation-scheduling/ExecutionPlanHistory';

import RunbookLibrary from
  './automation-scheduling/RunbookLibrary';

import ScheduleGrid from
  './automation-scheduling/ScheduleGrid';

import SchedulingCentreHeader from
  './automation-scheduling/SchedulingCentreHeader';

import {
  usePayrollAutomationScheduling,
} from './automation-scheduling';

export default function PayrollAutomationSchedulingCentre() {
  const scheduling = usePayrollAutomationScheduling();

  return (
    <section className="payroll-automation-scheduling-centre">
      <SchedulingCentreHeader />

      <ScheduleGrid
        schedules={scheduling.schedules}
        onRun={scheduling.runSchedule}
      />

      <div className="payroll-automation-scheduling-centre__grid">
        <EventWorkflowCard
          workflows={scheduling.workflows}
          onEvent={scheduling.handleEvent}
        />

        <ExecutionPlanHistory
          history={scheduling.history}
        />
      </div>

      <RunbookLibrary runbooks={scheduling.runbooks} />
    </section>
  );
}
