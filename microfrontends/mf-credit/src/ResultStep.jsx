/**
 * ResultStep — mf-credit
 *
 * Dominio: Crédito
 * Comunicación con el shell: window CustomEvents
 *   ← lendera:state  (recibe estado global)
 *   → lendera:action { type: 'SUBMIT_FOR_REVIEW' }
 */

import React, { useState, useEffect } from 'react';
import { StatusBadge } from './StatusBadge.jsx';

const DEFAULT_STATE = {
  application: { approvalStatus: 'draft' },
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

export default function ResultStep() {
  const state = useRemoteState();
  const status = state.application.approvalStatus;

  return (
    <section className="card">
      <div style={{ background: '#e11d48', color: '#fff', padding: '6px 20px', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.04em', display: 'flex', justifyContent: 'space-between' }}>
        <span>mf-credit</span>
        <span>:3005 · Crédito</span>
      </div>
      <div className="card-header row-between">
        <div>
          <h2>Paso 4. Evaluación y resultado · <code>mf-credit</code></h2>
          <p>Microfrontend crediticio. Dominio: Crédito. Puerto :3005</p>
        </div>
        <StatusBadge status={status} />
      </div>
      <div className="card-body stack-sm">
        <div className="info-box">
          Este dominio puede tener su propio motor de scoring y reglas de negocio,
          desplegado de forma independiente bajo un equipo de Crédito.
        </div>

        {status === 'draft' && (
          <button className="button button-primary" onClick={() => emitAction('SUBMIT_FOR_REVIEW')}>
            Enviar a revisión
          </button>
        )}

        {status === 'reviewing' && (
          <div className="muted">Evaluando riesgo y aprobación...</div>
        )}

        {status === 'approved' && (
          <div className="success-banner">
            <strong>Solicitud aprobada.</strong> El siguiente paso sería programar
            el desembolso a la billetera digital del solicitante.
          </div>
        )}

        {status === 'rejected' && (
          <div className="error-banner">
            La solicitud fue rechazada en esta simulación.
            El estado quedó trazado en el store del shell.
          </div>
        )}
      </div>
    </section>
  );
}
