import { useState } from 'react';
import PracticeDashboard from './workspaces/practice/PracticeDashboard';
import ClientWorkspace from './workspaces/client/ClientWorkspace';
import ProviderCentre from './workspaces/providers/ProviderCentre';

export default function App() {
  const [view, setView] = useState('practice');
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientInitialTab, setClientInitialTab] = useState('overview');

  function openClient(client, initialTab = 'overview') {
    setSelectedClient(client); setClientInitialTab(initialTab); setView('client');
  }

  if (view === 'providers') return <ProviderCentre onBack={() => setView('practice')} onOpenClientPayroll={(client) => openClient(client, 'payroll')} />;
  if (view === 'client' && selectedClient) return <ClientWorkspace client={selectedClient} initialTab={clientInitialTab} onBack={() => { setSelectedClient(null); setView('practice'); }} />;
  return <PracticeDashboard onOpenClient={(client) => openClient(client, 'overview')} onOpenProviders={() => setView('providers')} />;
}
