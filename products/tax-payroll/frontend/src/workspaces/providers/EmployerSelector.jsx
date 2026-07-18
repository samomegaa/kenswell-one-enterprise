import {
  useMemo,
  useState,
} from 'react';

import {
  useEmployerRuntime,
} from '../../runtime';

export function EmployerSelector({
  onEmployerSelected,
}) {
  const {
    employers,
    selectedEmployer,
    selectEmployer,
    loading,
  } = useEmployerRuntime();

  const [query, setQuery] = useState('');

  const filteredEmployers = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return employers;
    }

    return employers.filter((employer) =>
      [employer.name, employer.reference, employer.id]
        .filter(Boolean)
        .some((value) =>
          String(value)
            .toLowerCase()
            .includes(normalized)
        )
    );
  }, [employers, query]);

  function handleSelection(event) {
    const employer = selectEmployer(
      event.target.value
    );

    onEmployerSelected?.(employer);
  }

  return (
    <section className="employer-runtime-selector">
      <div className="employer-runtime-selector__header">
        <div>
          <p className="eyebrow">Enterprise payroll</p>
          <h2>Select an employer</h2>
        </div>

        <span aria-live="polite">
          {employers.length} employer
          {employers.length === 1 ? '' : 's'}
        </span>
      </div>

      <label>
        <span>Search employers</span>
        <input
          type="search"
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          placeholder="Search by name or reference"
        />
      </label>

      <label>
        <span>Employer</span>
        <select
          value={selectedEmployer?.id || ''}
          onChange={handleSelection}
          disabled={loading || !filteredEmployers.length}
        >
          {!selectedEmployer && (
            <option value="">
              Choose an employer
            </option>
          )}

          {filteredEmployers.map((employer) => (
            <option
              key={employer.id}
              value={employer.id}
            >
              {employer.name}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}
