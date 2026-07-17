import PropTypes from 'prop-types';
import {
  WorkspaceHeader,
  WorkspaceLayout,
  WorkspaceNavigation,
  WorkspaceSection,
} from '../../framework';

import PayPeriodStep from './PayPeriodStep';
import EmployeeSelectionStep from './EmployeeSelectionStep';
import PayrollValidationStep from './PayrollValidationStep';
import PayrollPreviewStep from './PayrollPreviewStep';
import PayrollApprovalStep from './PayrollApprovalStep';
import usePayrollProcessing from './usePayrollProcessing';
import { PROCESSING_STEPS } from './payrollProcessingModel';

export default function PayrollProcessingWorkspace({
  employerId,
  employerName,
  employees,
  schedules,
  onCancel,
  onCompleted,
}) {
  const processing = usePayrollProcessing({
    employerId,
    employees,
    onCompleted,
  });

  const panels = {
    period: (
      <PayPeriodStep
        run={processing.draft}
        schedules={schedules}
        errors={processing.errors}
        onChange={processing.change}
      />
    ),
    employees: (
      <EmployeeSelectionStep
        employees={employees}
        selectedIds={processing.draft.employeeIds}
        error={processing.errors.employeeIds}
        onToggle={processing.toggleEmployee}
        onSelectAll={processing.selectAll}
      />
    ),
    validation: (
      <PayrollValidationStep
        validation={processing.validation}
        validating={processing.busy === 'validate'}
        onValidate={processing.validate}
      />
    ),
    preview: (
      <PayrollPreviewStep
        preview={processing.preview}
        loading={processing.busy === 'preview'}
        onPreview={processing.generatePreview}
      />
    ),
    approval: (
      <PayrollApprovalStep
        run={processing.run}
        preview={processing.preview}
        approving={processing.busy === 'approve'}
        processing={processing.busy === 'process'}
        onApprove={processing.approve}
        onProcess={processing.process}
      />
    ),
  };

  return (
    <WorkspaceLayout
      header={
        <WorkspaceHeader
          eyebrow="Enterprise payroll processing"
          title="Process payroll"
          subtitle={employerName || 'Employer payroll run'}
          metadata={[
            { label: 'Employer ID', value: employerId },
            { label: 'Employees available', value: employees.length },
            {
              label: 'Run status',
              value: processing.run?.status || 'Not created',
            },
          ]}
          actions={
            <button type="button" onClick={onCancel}>
              Back to employees
            </button>
          }
        />
      }
      navigation={
        <WorkspaceNavigation
          items={PROCESSING_STEPS}
          activeId={processing.step.id}
          onSelect={(id) => {
            const index = PROCESSING_STEPS.findIndex((item) => item.id === id);
            if (index <= processing.stepIndex) processing.setStepIndex(index);
          }}
          ariaLabel="Payroll processing steps"
        />
      }
    >
      <WorkspaceSection
        title={processing.step.label}
        description={`Step ${processing.stepIndex + 1} of ${PROCESSING_STEPS.length}`}
      >
        {panels[processing.step.id]}

        {processing.operationError && (
          <p className="payroll-processing-error" role="alert">
            {processing.operationError}
          </p>
        )}

        {processing.stepIndex < 2 && (
          <footer className="payroll-processing-actions">
            <button
              type="button"
              onClick={processing.previous}
              disabled={processing.stepIndex === 0}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={processing.next}
              disabled={processing.busy === 'create'}
            >
              {processing.busy === 'create' ? 'Creating run…' : 'Continue'}
            </button>
          </footer>
        )}
      </WorkspaceSection>
    </WorkspaceLayout>
  );
}

PayrollProcessingWorkspace.propTypes = {
  employerId: PropTypes.string.isRequired,
  employerName: PropTypes.string,
  employees: PropTypes.array.isRequired,
  schedules: PropTypes.array.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
};
