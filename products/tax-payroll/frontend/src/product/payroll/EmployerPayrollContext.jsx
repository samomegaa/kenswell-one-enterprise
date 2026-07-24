import PropTypes from 'prop-types';

import {
  EmployerSelector,
} from '../../workspaces/providers/EmployerSelector';

import {
  EmployerRuntimeGuard,
} from '../../workspaces/providers/EmployerRuntimeGuard';

export default function EmployerPayrollContext({ context }) {
  return (
    <EmployerRuntimeGuard
      loadingFallback={
        <ContextState message="Loading employer runtime…" />
      }
      errorFallback={(error) => (
        <ContextState
          message={error.message}
          action="Retry"
          onAction={() =>
            context.refreshEmployers({ refresh: true })
          }
        />
      )}
      emptyFallback={
        <ContextState message="No employers were discovered." />
      }
    >
      <section className="payroll-employer-context">
        <div className="payroll-employer-context__identity">
          <span>Active employer context</span>
          <h2>
            {context.selectedEmployer?.name ||
              'Select an employer'}
          </h2>
          <p>
            {context.selectedEmployer
              ? 'Payroll actions are scoped to this employer.'
              : 'Choose an employer to activate payroll.'}
          </p>
        </div>

        <div className="payroll-employer-context__selector">
          <EmployerSelector />
        </div>
      </section>
    </EmployerRuntimeGuard>
  );
}

function ContextState({ message, action, onAction }) {
  return (
    <section className="payroll-runtime-required">
      <p>{message}</p>
      {action && (
        <button type="button" onClick={onAction}>
          {action}
        </button>
      )}
    </section>
  );
}

EmployerPayrollContext.propTypes = {
  context: PropTypes.shape({
    selectedEmployer: PropTypes.object,
    refreshEmployers: PropTypes.func.isRequired,
  }).isRequired,
};

ContextState.propTypes = {
  message: PropTypes.string.isRequired,
  action: PropTypes.string,
  onAction: PropTypes.func,
};
