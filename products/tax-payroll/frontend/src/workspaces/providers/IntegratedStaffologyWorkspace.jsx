import {
  EnterpriseRuntimeProvider,
} from '../../runtime';

import StaffologyProviderWorkspace from (
  './StaffologyProviderWorkspace'
);

import {
  EnterpriseRuntimeSidecar,
} from './EnterpriseRuntimeSidecar';

export default function IntegratedStaffologyWorkspace(
  props
) {
  return (
    <EnterpriseRuntimeProvider>
      <StaffologyProviderWorkspace {...props} />
      <EnterpriseRuntimeSidecar />
    </EnterpriseRuntimeProvider>
  );
}
