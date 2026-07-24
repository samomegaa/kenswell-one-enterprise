import PropTypes from 'prop-types';

export default function PayrollWorkflowRail({
  stages,
  activeId,
}) {
  return (
    <ol
      className="payroll-workflow-rail"
      aria-label="Payroll operational workflow"
    >
      {stages.map((stage, index) => (
        <li
          key={stage.id}
          className={
            stage.id === activeId
              ? 'is-active'
              : undefined
          }
        >
          <span>{index + 1}</span>
          <div>
            <strong>{stage.label}</strong>
            <small>{stage.status}</small>
          </div>
        </li>
      ))}
    </ol>
  );
}

PayrollWorkflowRail.propTypes = {
  stages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeId: PropTypes.string.isRequired,
};
