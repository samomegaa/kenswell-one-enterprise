import { useEffect, useState } from 'react';

import './provider-centre.css';
import './provider-centre-responsive.css';
import './provider-health.css';

import {
  getProviderCentre,
} from '../../services/provider-centre-api';

import ProviderCard from './ProviderCard';

const copy = {
  staffology: ['Staffology', 'Live payroll execution provider'],
  brightpay: ['BrightPay', 'Future payroll provider'],
  moneysoft: ['Moneysoft', 'Future payroll provider'],
};

export default function ProviderCentre({ onBack }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  async function load() {
    setStatus('loading');
    setError('');

    try {
      setData(await getProviderCentre());
      setStatus('ready');
    } catch (requestError) {
      setError(requestError.message);
      setStatus('error');
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="provider-centre-shell">
      <button
        className="provider-back-button"
        type="button"
        onClick={onBack}
      >
        ← Back to practice
      </button>

      <header className="provider-centre-header">
        <div>
          <p className="eyebrow">Enterprise payroll</p>
          <h1>Provider Centre</h1>
          <p>
            Live health is retrieved through the
            Enterprise Payroll Manager.
          </p>
        </div>

        <div className="provider-summary">
          <span>Connected providers</span>
          <strong>{data?.connectedProviders ?? '—'}</strong>
        </div>
      </header>

      {status === 'loading' && (
        <section className="provider-state">
          Checking provider health…
        </section>
      )}

      {status === 'error' && (
        <section className="provider-state provider-state-error">
          <strong>Provider health could not be loaded</strong>
          <span>{error}</span>
          <button type="button" onClick={load}>Try again</button>
        </section>
      )}

      {status === 'ready' && (
        <section className="provider-centre-grid">
          {data.providers.map((provider) => (
            <ProviderCard
              key={provider.name}
              name={copy[provider.name][0]}
              description={copy[provider.name][1]}
              status={provider.status}
              employerCount={null}
              linkedCount={
                provider.name === 'staffology' ? 0 : null
              }
              disabled={provider.status === 'coming_soon'}
              onOpen={() => {
                console.info('Open provider:', provider.name);
              }}
            />
          ))}
        </section>
      )}

      <section className="provider-boundary-note">
        <strong>Kenswell remains the gateway.</strong>
        <p>
          Health checks run through the Enterprise
          Payroll Manager, not from the browser.
        </p>
      </section>
    </main>
  );
}
