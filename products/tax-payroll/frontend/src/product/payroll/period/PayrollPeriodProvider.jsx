import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import PropTypes from 'prop-types';

import {
  PayrollPeriodContext,
} from './PayrollPeriodContext';

import {
  closePayrollPeriod,
} from './closePayrollPeriod';

import {
  restorePayrollPeriod,
} from './restorePayrollPeriod';

import {
  readPayrollPeriod,
  writePayrollPeriod,
} from './payrollPeriodStorage';

export function PayrollPeriodProvider({
  session,
  children,
}) {
  const [period, setPeriod] = useState(null);

  useEffect(() => {
    const next = restorePayrollPeriod(
      readPayrollPeriod(),
      session
    );

    setPeriod(next);
    writePayrollPeriod(next);
  }, [session]);

  const close = useCallback(() => {
    setPeriod((current) => {
      const next = closePayrollPeriod(current);
      writePayrollPeriod(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      period,
      active: period?.status === 'active',
      stage: period?.stage || 'created',
      close,
    }),
    [period, close]
  );

  return (
    <PayrollPeriodContext.Provider value={value}>
      {children}
    </PayrollPeriodContext.Provider>
  );
}

PayrollPeriodProvider.propTypes = {
  session: PropTypes.object,
  children: PropTypes.node.isRequired,
};
