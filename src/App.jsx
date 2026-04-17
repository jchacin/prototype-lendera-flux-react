import React from 'react';
import { lenderaActions } from './actions/lenderaActions';
import { useLenderaStore } from './hooks/useLenderaStore';
import { LoginPanel } from './components/LoginPanel';
import { Stepper } from './components/Stepper';
import { PersonalDataStep } from './components/PersonalDataStep';
import { KycStep } from './components/KycStep';
import { DocumentsStep } from './components/DocumentsStep';
import { ResultStep } from './components/ResultStep';
import { SummaryPanel } from './components/SummaryPanel';
import { NotificationList } from './components/NotificationList';
import { FluxInspector } from './components/FluxInspector';

function CurrentStepView() {
  const state = useLenderaStore();
  const { currentStep, kycStatus, documentsStatus } = state.application;

  if (currentStep === 1) return <PersonalDataStep />;
  if (currentStep === 2) return <KycStep />;
  if (currentStep === 3) return <DocumentsStep />;
  if (currentStep === 4) return <ResultStep />;

  if (kycStatus === 'success' && documentsStatus === 'success') {
    return <ResultStep />;
  }

  return <PersonalDataStep />;
}

export default function App() {
  const state = useLenderaStore();

  return (
    <div className="app-shell">
      <div className="container">
        <div className="hero">
          <div>
            <span className="pill">Mini-prototipo React + Flux</span>
            <h1>Lendera · Flujo de microcrédito con estado centralizado</h1>
            <p>
              Este prototipo demuestra cómo Flux organiza el estado de una aplicación financiera: la vista emite acciones,
              el dispatcher las propaga, el store centraliza los cambios y la interfaz se actualiza de manera predecible.
            </p>
          </div>
          {state.session.isLoggedIn ? (
            <div className="row gap-sm wrap">
              <button className="button button-secondary" onClick={() => lenderaActions.goToStep(Math.max(1, state.application.currentStep - 1))}>
                Retroceder
              </button>
              <button className="button button-secondary" onClick={lenderaActions.resetApplication}>
                Reiniciar demo
              </button>
            </div>
          ) : null}
        </div>

        <div className="layout">
          <main className="stack-lg">
            {!state.session.isLoggedIn ? (
              <LoginPanel />
            ) : (
              <>
                <section className="card">
                  <div className="card-header">
                    <h2>Progreso del flujo</h2>
                    <p>Estado global visible para mejorar claridad y confianza del usuario.</p>
                  </div>
                  <div className="card-body stack-sm">
                    <Stepper currentStep={state.application.currentStep} />
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${state.progress}%` }} />
                    </div>
                  </div>
                </section>
                <CurrentStepView />
              </>
            )}
          </main>

          <aside className="stack-lg">
            <SummaryPanel />

            <section className="card">
              <div className="card-header">
                <h2>Eventos recientes</h2>
                <p>Mensajes generados por las transiciones del store.</p>
              </div>
              <div className="card-body">
                <NotificationList items={state.application.notifications} />
              </div>
            </section>

            <FluxInspector />

            <section className="card">
              <div className="card-header">
                <h2>Qué demuestra este prototipo</h2>
              </div>
              <div className="card-body stack-sm">
                <div className="info-item">El formulario usa estado local solo para capturar datos antes de consolidarlos en el store.</div>
                <div className="info-item">Los procesos de identidad, documentos y aprobación viven en un estado centralizado y trazable.</div>
                <div className="info-item">La asincronía se comunica con estados claros de carga, éxito y error para reducir incertidumbre.</div>
                <div className="warning-box">Es un mini-prototipo didáctico. En producción se separarían aún más los dominios, servicios y pruebas automatizadas.</div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
