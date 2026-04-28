/**
 * KycStep — mf-kyc
 *
 * Dominio: Compliance
 * Comunicación con el shell: window CustomEvents
 *   ← lendera:state  (recibe estado global)
 *   → lendera:action { type: 'START_KYC' }
 */

import React, { useState, useEffect } from 'react';
import { StatusBadge } from './StatusBadge.jsx';

const DEFAULT_STATE = {
  application: { kycStatus: 'idle' },
};

function useRemoteState() {
  const [state, setState] = useState(DEFAULT_STATE);
  useEffect(() => {
    const handler = (e) => setState(e.detail);
    window.addEventListener('lendera:state', handler);
    window.dispatchEvent(new CustomEvent('lendera:requestState'));
    return () => window.removeEventListener('lendera:state', handler);
  }, []);
  return state;
}

function emitAction(type, payload) {
  window.dispatchEvent(new CustomEvent('lendera:action', { detail: { type, payload } }));
}

export default function KycStep() {
  const state = useRemoteState();
  const status = state.application.kycStatus;

  return (
    <section className="card">
      <div style={{ background: '#d97706', color: '#fff', padding: '6px 20px', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.04em', display: 'flex', justifyContent: 'space-between' }}>
        <span>mf-kyc</span>
        <span>:3003 · Compliance</span>
      </div>
      <div className="card-header row-between">
        <div>
          <h2>Paso 2. Validación de identidad · <code>mf-kyc</code></h2>
          <p>Microfrontend de compliance KYC. Dominio: Compliance. Puerto :3003</p>
        </div>
        <StatusBadge status={status} />
      </div>
      <div className="card-body stack-sm">
        <div className="info-box">
          El ciclo de identidad es gestionado por el shell vía Flux:
          <strong> idle → loading → success/error</strong>.
          Este MF solo emite la acción; el estado llega de vuelta por el event bus.
        </div>
        <div className="row gap-sm wrap">
          <button
            className="button button-primary"
            disabled={status === 'loading'}
            onClick={() => emitAction('START_KYC')}
          >
            {status === 'loading' ? 'Validando...' : 'Ejecutar KYC'}
          </button>
          {status === 'error' && (
            <button className="button button-secondary" onClick={() => emitAction('START_KYC')}>
              Reintentar validación
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
