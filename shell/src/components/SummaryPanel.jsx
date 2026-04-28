import React from 'react';
import { useLenderaStore } from '../hooks/useLenderaStore.js';

export function SummaryPanel() {
  const state = useLenderaStore();

  return (
    <section className="card">
      <div className="card-header">
        <h2>Resumen de arquitectura</h2>
        <p>Microfrontends integrados vía Module Federation (client-side).</p>
      </div>
      <div className="card-body stack-sm">
        <div className="info-item">
          <strong>Integración:</strong> Client-side · Vite Plugin Federation.
        </div>
        <div className="info-item">
          <strong>Comunicación:</strong> Event Bus sobre <code>window</code> (CustomEvent).
        </div>
        <div className="info-item">
          <strong>Estado central:</strong> Flux en el shell → difundido a todos los MFs.
        </div>
        <div className="info-item">
          <strong>Aislamiento:</strong> Cada MF tiene su propio bundle y equipo.
        </div>
        <div className="info-item">
          <strong>Progreso actual:</strong> {state.progress}%
        </div>
      </div>
    </section>
  );
}
