import { useMemo, useState } from 'react';
import { createEmployee } from '../employeeApi';
import {
  CREATION_STEPS,
  cloneInitialEmployee,
} from './employeeCreationModel';
import {
  hasErrors,
  validateEmployee,
  validateStep,
} from './employeeCreationValidation';

export default function useEmployeeCreation({
  clientId,
  employerId,
  onCreated,
}) {
  const [draft, setDraft] = useState(cloneInitialEmployee);
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const step = CREATION_STEPS[stepIndex];

  function change(event) {
    const { name, value, type, checked } = event.target;
    const [section, field] = name.split('.');

    setDraft((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: type === 'checkbox' ? checked : value,
      },
    }));

    setErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function next() {
    const nextErrors = validateStep(step.id, draft);

    if (hasErrors(nextErrors)) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setStepIndex((current) => Math.min(current + 1, CREATION_STEPS.length - 1));
  }

  function previous() {
    setErrors({});
    setStepIndex((current) => Math.max(current - 1, 0));
  }

  async function submit() {
    const nextErrors = validateEmployee(draft);

    if (hasErrors(nextErrors)) {
      setErrors(nextErrors);
      setStepIndex(0);
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      const employee = await createEmployee({
        clientId,
        employerId,
        ...draft,
      });
      onCreated?.(employee);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return useMemo(() => ({
    draft,
    step,
    stepIndex,
    errors,
    submitting,
    submitError,
    change,
    next,
    previous,
    submit,
  }), [draft, step, stepIndex, errors, submitting, submitError]);
}
