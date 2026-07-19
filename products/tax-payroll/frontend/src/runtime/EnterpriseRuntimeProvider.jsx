import {
  EmployerRuntimeProvider,
} from './EmployerRuntimeProvider';

import {
  EmployeeRuntimeProvider,
} from './EmployeeRuntimeProvider';

export function EnterpriseRuntimeProvider({
  children,
}) {
  return (
    <EmployerRuntimeProvider>
      <EmployeeRuntimeProvider>
        {children}
      </EmployeeRuntimeProvider>
    </EmployerRuntimeProvider>
  );
}
