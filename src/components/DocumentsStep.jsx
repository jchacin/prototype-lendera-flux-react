import React from 'react';
import { lenderaActions } from '../actions/lenderaActions';
import { useLenderaStore } from '../hooks/useLenderaStore';
import { StatusBadge } from './StatusBadge';

export function DocumentsStep() {
  const state = useLenderaStore();
  const status = state.application.documentsStatus;

  return (
    <section className="card">
      <div className="card-header row-between">
        <div>
          <h2>Paso 3. Carga de documentos</h2>
          <p>Simulación de adjuntos y verificación documental.</p>
        </div>
        <StatusBadge status={status} />
      </div>
      <div className="card-body stack-sm">
        <div className="info-box">
          Esta operación representa una llamada remota que actualiza el store mediante acciones.
        </div>
        <div className="row gap-sm wrap">
          <button className="button button-primary" onClick={lenderaActions.uploadDocument} disabled={status === 'loading'}>
            {status === 'loading' ? 'Cargando...' : 'Subir documento'}
          </button>
          {status === 'error' && (
            <button className="button button-secondary" onClick={lenderaActions.uploadDocument}>
              Reintentar carga
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
