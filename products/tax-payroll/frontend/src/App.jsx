import { useState } from 'react';

import OperationalProductShell from './product/shell/OperationalProductShell';

import PracticeDashboard from './workspaces/practice/PracticeDashboard';
import ClientWorkspace from './workspaces/client/ClientWorkspace';
import EnterpriseProviderCentre from './workspaces/providers/EnterpriseProviderCentre';

import {
  EnterpriseRuntimeProvider,
  providerCentrePath,
  useEnterpriseRuntimeNavigation,
} from './runtime';

function EnterpriseApplication() {
  const { route, navigate } =
    useEnterpriseRuntimeNavigation();

  const [view, setView] = useState(
    route.view === 'providers'
      ? 'providers'
      : 'practice'
  );

  const [selectedClient, setSelectedClient] =
    useState(null);

  const [clientInitialTab, setClientInitialTab] =
    useState('overview');

  function openClient(
    client,
    initialTab = 'overview'
  ) {
    setSelectedClient(client);
    setClientInitialTab(initialTab);
    setView('client');
  }

  function openProviders() {
    setView('providers');
    navigate(providerCentrePath());
  }

  function returnToPractice() {
    setView('practice');
    navigate('/');
  }

  if (view === 'providers') {
    return (
      <EnterpriseProviderCentre
        route={route}
        navigate={navigate}
        onBack={returnToPractice}
      />
    );
  }

  if (view === 'client' && selectedClient) {
    return (
      <ClientWorkspace
        client={selectedClient}
        initialTab={clientInitialTab}
        onBack={() => {
          setSelectedClient(null);
          setView('practice');
        }}
      />
    );
  }

  return (
    <OperationalProductShell>
      <EnterpriseProviderCentre
        route={route}
        navigate={navigate}
        onBack={returnToPractice}
      />
    </OperationalProductShell>
  );

}

export default function App() {
  return (
    <EnterpriseRuntimeProvider>
      <EnterpriseApplication />
    </EnterpriseRuntimeProvider>
  );
}
