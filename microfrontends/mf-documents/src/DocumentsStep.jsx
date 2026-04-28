/**
 * DocumentsStep — mf-documents
 *
 * Dominio: Compliance
 * Comunicación con el shell: window CustomEvents
 *   ← lendera:state  (recibe estado global)
 *   → lendera:action { type: 'UPLOAD_DOCUMENT' }
 */

import React, { useState, useEffect } from 'react';
import { StatusBadge } from './StatusBadge.jsx';

const DEFAULT_STATE = {
  application: { documentsStatus: 'idle' },
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

export default function DocumentsStep() {
  const state = useRemoteState();
  const status = state.application.documentsStatus;

  return (
    <section className="card">
      <div style={{ background: '#7c3aed', color: '#fff', padding: '6px 20px', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.04em', display: 'flex', justifyContent: 'space-between' }}>
        <span>mf-documents</span>
        <span>:3004 · Compliance</span>
      </div>
      <div className="card-header row-between">
        <div>
          <h2>Paso 3. Carga de documentos · <code>mf-documents</code></h2>
          <p>Microfrontend documental. Dominio: Compliance. Puerto :3004</p>
        </div>
        <StatusBadge status={status} />
      </div>
      <div className="card-body stack-sm">
        <div className="info-box">
          Este MF puede ser reemplazado por un proveedor externo de verificación documental
          sin afectar al shell ni a los otros MFs.
        </div>
        <div className="row gap-sm wrap">
          <button
            className="button button-primary"
            disabled={status === 'loading'}
            onClick={() => emitAction('UPLOAD_DOCUMENT')}
          >
            {status === 'loading' ? 'Cargando...' : 'Subir documento'}
          </button>
          {status === 'error' && (
            <button className="button button-secondary" onClick={() => emitAction('UPLOAD_DOCUMENT')}>
              Reintentar carga
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
