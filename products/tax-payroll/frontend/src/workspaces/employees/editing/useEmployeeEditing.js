import { useMemo, useState } from 'react';
import { updateEmployee } from '../employeeApi';
import {
  cloneEmployee,
  EDITING_SECTIONS,
} from './employeeEditingModel';
import {
  hasValidationErrors,
  validateEmployeeUpdate,
} from './employeeEditingValidation';

export default function useEmployeeEditing({ employee, onSaved }) {
  const [draft, setDraft] = useState(() => cloneEmployee(employee));
  const [activeId, setActiveId] = useState('identity');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

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

  function lifecycle(action) {
    setDraft((current) => ({
      ...current,
      employment: {
        ...current.employment,
        status: action.status,
        leavingDate:
          action.id === 'leave'
            ? new Date().toISOString().slice(0, 10)
            : '',
      },
    }));
  }

  async function save() {
    const nextErrors = validateEmployeeUpdate(draft);

    if (hasValidationErrors(nextErrors)) {
      setErrors(nextErrors);
      setActiveId('identity');
      return;
    }

    setSaving(true);
    setSaveError('');

    try {
      const updated = await updateEmployee(draft.id, {
        ...draft,
        expectedVersion: draft.version,
      });

      onSaved?.(updated);
    } catch (error) {
      setSaveError(error.message);
    } finally {
      setSaving(false);
    }
  }

  return useMemo(() => ({
    draft,
    sections: EDITING_SECTIONS,
    activeId,
    errors,
    saving,
    saveError,
    setActiveId,
    change,
    lifecycle,
    save,
  }), [draft, activeId, errors, saving, saveError]);
}
