import {
  useMemo,
  useState,
} from 'react';

import {
  useEmployeeRuntime,
} from '../../runtime';

function employeeName(employee) {
  const direct =
    employee.displayName ||
    employee.name ||
    employee.fullName;

  if (direct) {
    return direct;
  }

  return [
    employee.firstName,
    employee.middleName,
    employee.lastName || employee.surname,
  ]
    .filter(Boolean)
    .join(' ') || 'Unnamed employee';
}

function employeeReference(employee) {
  return (
    employee.payrollCode ||
    employee.employeeCode ||
    employee.reference ||
    employee.id
  );
}

export function EmployeeList({
  onEmployeeSelected,
  onOpenWorkspace,
}) {
  const {
    employees,
    selectedEmployee,
    selectEmployee,
  } = useEmployeeRuntime();

  const [query, setQuery] = useState('');

  const filteredEmployees = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return employees;
    }

    return employees.filter((employee) =>
      [
        employeeName(employee),
        employeeReference(employee),
        employee.status,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value)
            .toLowerCase()
            .includes(normalized)
        )
    );
  }, [employees, query]);

  function handleSelection(employee) {
    const selected = selectEmployee(employee);
    onEmployeeSelected?.(selected);
  }

  return (
    <section className="employee-runtime-list">
      <header className="employee-runtime-list__header">
        <div>
          <p className="eyebrow">Employees</p>
          <h2>Employer employees</h2>
        </div>

        <span aria-live="polite">
          {employees.length} employee
          {employees.length === 1 ? '' : 's'}
        </span>
      </header>

      <label className="employee-runtime-list__search">
        <span>Search employees</span>
        <input
          type="search"
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          placeholder="Search by name, code or status"
        />
      </label>

      <div className="employee-runtime-list__table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Employee</th>
              <th scope="col">Reference</th>
              <th scope="col">Status</th>
              <th scope="col">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((employee) => {
              const selected =
                employee.id === selectedEmployee?.id;

              return (
                <tr
                  key={employee.id}
                  data-selected={selected || undefined}
                >
                  <td>
                    <button
                      type="button"
                      className="employee-runtime-list__name"
                      onClick={() =>
                        handleSelection(employee)
                      }
                    >
                      {employeeName(employee)}
                    </button>
                  </td>

                  <td>{employeeReference(employee)}</td>

                  <td>
                    <span className="employee-status-badge">
                      {employee.status || 'Unknown'}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        handleSelection(employee);
                        onOpenWorkspace?.(employee);
                      }}
                    >
                      Open workspace
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {!filteredEmployees.length && (
        <p role="status">
          No employees match your search.
        </p>
      )}
    </section>
  );
}
