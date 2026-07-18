import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  enterpriseRuntimeApi,
} from '../services/enterprise-runtime-api';

import {
  EmployerRuntimeContext,
} from './EmployerRuntimeContext';

import {
  readSelectedEmployerId,
  writeSelectedEmployerId,
} from './employerRuntimeStorage';

function resolveInitialEmployer(employers) {
  const storedId = readSelectedEmployerId();

  return (
    employers.find(
      (employer) => employer.id === storedId
    ) ||
    employers[0] ||
    null
  );
}

export function EmployerRuntimeProvider({
  children,
  api = enterpriseRuntimeApi,
}) {
  const [employers, setEmployers] = useState([]);
  const [
    selectedEmployer,
    setSelectedEmployer,
  ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshEmployers = useCallback(
    async ({ refresh = false } = {}) => {
      setLoading(true);
      setError(null);

      try {
        const result = await api.listEmployers({
          refresh,
        });

        const nextEmployers = Array.isArray(result)
          ? result
          : [];

        setEmployers(nextEmployers);

        setSelectedEmployer((current) => {
          const currentMatch = nextEmployers.find(
            (employer) =>
              employer.id === current?.id
          );

          const next =
            currentMatch ||
            resolveInitialEmployer(nextEmployers);

          writeSelectedEmployerId(next?.id || null);
          return next;
        });

        return nextEmployers;
      } catch (runtimeError) {
        setError(runtimeError);
        throw runtimeError;
      } finally {
        setLoading(false);
      }
    },
    [api]
  );

  const selectEmployer = useCallback(
    (employerOrId) => {
      const employerId =
        typeof employerOrId === 'string'
          ? employerOrId
          : employerOrId?.id;

      const next = employers.find(
        (employer) => employer.id === employerId
      );

      if (!next) {
        throw new Error(
          `Employer ${employerId} is unavailable`
        );
      }

      setSelectedEmployer(next);
      writeSelectedEmployerId(next.id);
      return next;
    },
    [employers]
  );

  const clearEmployer = useCallback(() => {
    setSelectedEmployer(null);
    writeSelectedEmployerId(null);
  }, []);

  useEffect(() => {
    refreshEmployers().catch(() => {});
  }, [refreshEmployers]);

  const value = useMemo(
    () => ({
      employers,
      availableEmployers: employers,
      selectedEmployer,
      loading,
      error,
      refreshEmployers,
      selectEmployer,
      clearEmployer,
    }),
    [
      employers,
      selectedEmployer,
      loading,
      error,
      refreshEmployers,
      selectEmployer,
      clearEmployer,
    ]
  );

  return (
    <EmployerRuntimeContext.Provider value={value}>
      {children}
    </EmployerRuntimeContext.Provider>
  );
}
