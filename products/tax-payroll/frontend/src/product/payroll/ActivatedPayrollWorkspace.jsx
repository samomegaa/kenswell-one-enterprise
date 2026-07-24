import PayrollOperationalWorkspace from
  './PayrollOperationalWorkspace';

import {
  usePayrollEmployerContext,
} from './context';

import {
  PayrollSessionProvider,
} from './session';

export default function ActivatedPayrollWorkspace() {
  const context = usePayrollEmployerContext();

  return (
    <PayrollSessionProvider
      runtimeWorkspace={context.runtimeWorkspace}
    >
      <PayrollOperationalWorkspace context={context} />
    </PayrollSessionProvider>
  );
}
