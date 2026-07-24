import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import PropTypes from 'prop-types';

import {
  PayrollSessionContext,
} from './PayrollSessionContext';

import {
  restorePayrollSession,
} from './restorePayrollSession';

import {
  readPayrollSession,
  writePayrollSession,
} from './payrollSessionStorage';

export function PayrollSessionProvider({
  runtimeWorkspace,
  children,
}) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const next = restorePayrollSession(
      readPayrollSession(),
      runtimeWorkspace
    );

    setSession(next);
    writePayrollSession(next);
  }, [runtimeWorkspace]);

  const deactivate = useCallback(() => {
    setSession(null);
    writePayrollSession(null);
  }, []);

  const value = useMemo(
    () => ({
      session,
      active: session?.status === 'active',
      deactivate,
    }),
    [session, deactivate]
  );

  return (
    <PayrollSessionContext.Provider value={value}>
      {children}
    </PayrollSessionContext.Provider>
  );
}

PayrollSessionProvider.propTypes = {
  runtimeWorkspace: PropTypes.object,
  children: PropTypes.node.isRequired,
};
