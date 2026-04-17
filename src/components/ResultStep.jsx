import React from 'react';
import { lenderaActions } from '../actions/lenderaActions';
import { useLenderaStore } from '../hooks/useLenderaStore';
import { StatusBadge } from './StatusBadge';

export function ResultStep() {
  const state = useLenderaStore();
  const status = state.application.approvalStatus;

  return (
    <section className="card">
      <div className="card-header row-between">
        <div>
          <h2>Paso 4. Evaluación y resultado</h2>
          <p>El envío y resultado de evaluación también siguen el flujo Flux.</p>
        </div>
        <StatusBadge status={status} />
      </div>
      <div className="card-body stack-sm">
        <div className="info-box">
          Cuando la solicitud pasa a evaluación, el estado del crédito se actualiza de forma centralizada y la UI reacciona automáticamente.
        </div>

        {status === 'draft' && (
          <button className="button button-primary" onClick={lenderaActions.submitForReview}>
            Enviar a revisión
          </button>
        )}

        {status === 'reviewing' && <div className="muted">Evaluando riesgo y aprobación...</div>}

        {status === 'approved' && (
          <div className="success-banner">
            Solicitud aprobada. El siguiente paso sería programar el desembolso a la billetera digital.
          </div>
        )}

        {status === 'rejected' && (
          <div className="error-banner">
            La solicitud fue rechazada en esta simulación. El estado quedó trazado dentro del store.
          </div>
        )}
      </div>
    </section>
  );
}
