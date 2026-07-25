import PropTypes from 'prop-types';

export default function ScheduleGrid({
  schedules,
  onRun,
}) {
  return (
    <section className="schedule-grid">
      {schedules.map((schedule) => (
        <article key={schedule.id}>
          <header>
            <strong>{schedule.label}</strong>
            <span>{schedule.frequency}</span>
          </header>

          <p>{schedule.evaluation.reason}</p>

          <button
            type="button"
            disabled={
              !schedule.enabled ||
              schedule.frequency === 'event'
            }
            onClick={() => onRun(schedule)}
          >
            Create execution plan
          </button>
        </article>
      ))}
    </section>
  );
}

ScheduleGrid.propTypes = {
  schedules: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRun: PropTypes.func.isRequired,
};
