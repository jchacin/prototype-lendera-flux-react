import React from 'react';
import { lenderaActions } from '../actions/lenderaActions';
import { useLenderaStore } from '../hooks/useLenderaStore';
import { StatusBadge } from './StatusBadge';

export function KycStep() {
  const state = useLenderaStore();
  const status = state.application.kycStatus;

  return (
    <section className="card">
      <div className="card-header row-between">
        <div>
          <h2>Paso 2. Validación de identidad</h2>
          <p>Estado centralizado y asincronía visible para el usuario.</p>
        </div>
        <StatusBadge status={status} />
      </div>
      <div className="card-body stack-sm">
        <div className="info-box">
          El store controla el ciclo de identidad: <strong>idle → loading → success/error</strong>.
        </div>
        <div className="row gap-sm wrap">
          <button className="button button-primary" onClick={lenderaActions.startKyc} disabled={status === 'loading'}>
            {status === 'loading' ? 'Validando...' : 'Ejecutar KYC'}
          </button>
          {status === 'error' && (
            <button className="button button-secondary" onClick={lenderaActions.startKyc}>
              Reintentar validación
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
