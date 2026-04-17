import React from 'react';
import { useLenderaStore } from '../hooks/useLenderaStore';

export function SummaryPanel() {
  const state = useLenderaStore();

  return (
    <section className="card">
      <div className="card-header">
        <h2>Resumen de arquitectura</h2>
        <p>Cómo se materializa Flux en este mini-prototipo.</p>
      </div>
      <div className="card-body stack-sm">
        <div className="info-item"><strong>Estado local:</strong> inputs del formulario de datos personales.</div>
        <div className="info-item"><strong>Estado centralizado:</strong> sesión, progreso, KYC, documentos y aprobación.</div>
        <div className="info-item"><strong>Flujo unidireccional:</strong> Vista → Acción → Dispatcher → Store → Vista.</div>
        <div className="info-item"><strong>Progreso actual:</strong> {state.progress}%.</div>
      </div>
    </section>
  );
}
