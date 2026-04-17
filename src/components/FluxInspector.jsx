import React, { useMemo } from 'react';
import { useLenderaStore } from '../hooks/useLenderaStore';

export function FluxInspector() {
  const state = useLenderaStore();

  const snapshot = useMemo(
    () => JSON.stringify(
      {
        session: state.session,
        application: {
          currentStep: state.application.currentStep,
          kycStatus: state.application.kycStatus,
          documentsStatus: state.application.documentsStatus,
          approvalStatus: state.application.approvalStatus,
          personalData: state.application.personalData,
        },
      },
      null,
      2
    ),
    [state]
  );

  return (
    <section className="card">
      <div className="card-header">
        <h2>Inspector de estado centralizado</h2>
        <p>Este panel permite observar cómo Flux centraliza y hace trazable el estado.</p>
      </div>
      <div className="card-body">
        <pre className="code-block">{snapshot}</pre>
      </div>
    </section>
  );
}
