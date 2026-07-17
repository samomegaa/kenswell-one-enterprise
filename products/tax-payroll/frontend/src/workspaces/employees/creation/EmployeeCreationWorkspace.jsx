import PropTypes from 'prop-types';
import {
  WorkspaceHeader,
  WorkspaceLayout,
  WorkspaceNavigation,
  WorkspaceSection,
} from '../../framework';

import IdentityStep from './IdentityStep';
import EmploymentStep from './EmploymentStep';
import PayrollStep from './PayrollStep';
import TaxStep from './TaxStep';
import PensionStep from './PensionStep';
import ReviewStep from './ReviewStep';
import useEmployeeCreation from './useEmployeeCreation';
import { CREATION_STEPS } from './employeeCreationModel';

const PANELS = {
  identity: IdentityStep,
  employment: EmploymentStep,
  payroll: PayrollStep,
  tax: TaxStep,
  pension: PensionStep,
  review: ReviewStep,
};

export default function EmployeeCreationWorkspace({
  clientId,
  employerId,
  onCancel,
  onCreated,
}) {
  const creation = useEmployeeCreation({
    clientId,
    employerId,
    onCreated,
  });

  const Panel = PANELS[creation.step.id];
  const reviewing = creation.step.id === 'review';

  return (
    <WorkspaceLayout
      header={
        <WorkspaceHeader
          eyebrow="Enterprise employee management"
          title="Create employee"
          subtitle="Create the canonical payroll employee record."
          metadata={[
            { label: 'Client', value: clientId },
            { label: 'Employer', value: employerId },
          ]}
          actions={
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          }
        />
      }
      navigation={
        <WorkspaceNavigation
          items={CREATION_STEPS}
          activeId={creation.step.id}
          onSelect={() => {}}
          ariaLabel="Employee creation steps"
        />
      }
    >
      <WorkspaceSection
        title={creation.step.label}
        description={`Step ${creation.stepIndex + 1} of ${CREATION_STEPS.length}`}
      >
        <Panel
          draft={creation.draft}
          errors={creation.errors}
          onChange={creation.change}
        />

        {creation.submitError && (
          <p className="employee-creation-error" role="alert">
            {creation.submitError}
          </p>
        )}

        <footer className="employee-creation-actions">
          <button
            type="button"
            onClick={creation.previous}
            disabled={creation.stepIndex === 0 || creation.submitting}
          >
            Previous
          </button>

          {reviewing ? (
            <button
              type="button"
              onClick={creation.submit}
              disabled={creation.submitting}
            >
              {creation.submitting ? 'Creating…' : 'Create employee'}
            </button>
          ) : (
            <button type="button" onClick={creation.next}>
              Continue
            </button>
          )}
        </footer>
      </WorkspaceSection>
    </WorkspaceLayout>
  );
}

EmployeeCreationWorkspace.propTypes = {
  clientId: PropTypes.string.isRequired,
  employerId: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreated: PropTypes.func.isRequired,
};
