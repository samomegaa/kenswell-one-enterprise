import { useMemo, useState } from 'react';
import {
  approvePayrollRun,
  createPayrollRun,
  previewPayrollRun,
  processPayrollRun,
  validatePayrollRun,
} from './payrollProcessingApi';
import {
  PROCESSING_STEPS,
  cloneInitialRun,
} from './payrollProcessingModel';
import {
  hasErrors,
  validateEmployeeSelection,
  validateRunSetup,
} from './payrollProcessingValidation';

export default function usePayrollProcessing({
  employerId,
  employees,
  onCompleted,
}) {
  const [draft, setDraft] = useState(cloneInitialRun);
  const [stepIndex, setStepIndex] = useState(0);
  const [run, setRun] = useState(null);
  const [validation, setValidation] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState('');
  const [operationError, setOperationError] = useState('');

  const step = PROCESSING_STEPS[stepIndex];

  function change(event) {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function toggleEmployee(employeeId) {
    setDraft((current) => ({
      ...current,
      employeeIds: current.employeeIds.includes(employeeId)
        ? current.employeeIds.filter((id) => id !== employeeId)
        : [...current.employeeIds, employeeId],
    }));
  }

  function selectAll() {
    setDraft((current) => ({
      ...current,
      employeeIds:
        current.employeeIds.length === employees.length
          ? []
          : employees.map((employee) => employee.id),
    }));
  }

  async function next() {
    const nextErrors =
      step.id === 'period'
        ? validateRunSetup(draft)
        : step.id === 'employees'
          ? validateEmployeeSelection(draft)
          : {};

    if (hasErrors(nextErrors)) {
      setErrors(nextErrors);
      return;
    }

    if (step.id === 'employees' && !run) {
      await create();
      return;
    }

    setErrors({});
    setStepIndex((current) => Math.min(current + 1, PROCESSING_STEPS.length - 1));
  }

  async function create() {
    setBusy('create');
    setOperationError('');

    try {
      const created = await createPayrollRun({ employerId, ...draft });
      setRun(created);
      setStepIndex(2);
    } catch (error) {
      setOperationError(error.message);
    } finally {
      setBusy('');
    }
  }

  async function validate() {
    setBusy('validate');
    setOperationError('');

    try {
      setValidation(await validatePayrollRun(run.id));
    } catch (error) {
      setOperationError(error.message);
    } finally {
      setBusy('');
    }
  }

  async function generatePreview() {
    setBusy('preview');
    setOperationError('');

    try {
      setPreview(await previewPayrollRun(run.id));
    } catch (error) {
      setOperationError(error.message);
    } finally {
      setBusy('');
    }
  }

  async function approve() {
    setBusy('approve');

    try {
      setRun(await approvePayrollRun(run.id, run.version));
    } catch (error) {
      setOperationError(error.message);
    } finally {
      setBusy('');
    }
  }

  async function process() {
    setBusy('process');

    try {
      const completed = await processPayrollRun(run.id, run.version);
      setRun(completed);
      onCompleted?.(completed);
    } catch (error) {
      setOperationError(error.message);
    } finally {
      setBusy('');
    }
  }

  return useMemo(() => ({
    draft,
    step,
    stepIndex,
    run,
    validation,
    preview,
    errors,
    busy,
    operationError,
    change,
    toggleEmployee,
    selectAll,
    next,
    previous: () => setStepIndex((current) => Math.max(current - 1, 0)),
    setStepIndex,
    validate,
    generatePreview,
    approve,
    process,
  }), [draft, step, stepIndex, run, validation, preview, errors, busy, operationError]);
}
