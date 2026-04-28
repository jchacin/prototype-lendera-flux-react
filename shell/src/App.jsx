import React, { Suspense, lazy } from 'react';
import { useLenderaStore } from './hooks/useLenderaStore.js';
import { lenderaActions } from './actions/lenderaActions.js';
import { Stepper } from './components/Stepper.jsx';
import { SummaryPanel } from './components/SummaryPanel.jsx';
import { NotificationList } from './components/NotificationList.jsx';
import { FluxInspector } from './components/FluxInspector.jsx';
import { MFWrapper } from './components/MFWrapper.jsx';
import { MF_DOMAINS } from './constants.js';

// ── Carga remota vía Module Federation ──────────────────────────
// Cada import se resuelve en runtime desde el remoteEntry.js del MF.
const LoginPanel       = lazy(() => import('mfAuth/LoginPanel'));
const PersonalDataStep = lazy(() => import('mfOnboarding/PersonalDataStep'));
const KycStep          = lazy(() => import('mfKyc/KycStep'));
const DocumentsStep    = lazy(() => import('mfDocuments/DocumentsStep'));
const ResultStep       = lazy(() => import('mfCredit/ResultStep'));

// Componente con key por paso: fuerza un ErrorBoundary limpio en cada transición.
function CurrentStepView({ currentStep }) {
  if (currentStep === 2) return <MFWrapper key="kyc" name="mf-kyc"><KycStep /></MFWrapper>;
  if (currentStep === 3) return <MFWrapper key="doc" name="mf-documents"><DocumentsStep /></MFWrapper>;
  if (currentStep === 4) return <MFWrapper key="crd" name="mf-credit"><ResultStep /></MFWrapper>;
  return <MFWrapper key="onb" name="mf-onboarding"><PersonalDataStep /></MFWrapper>;
}

export default function App() {
  const state = useLenderaStore();
  const { currentStep } = state.application;

  return (
    <div className="app-shell">
      <div className="container">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <div className="hero">
          <div>
            <span className="pill">Microfrontends · Module Federation · Flux</span>
            <h1>Lendera · Arquitectura de Microfrontends</h1>
            <p>
              Cada paso del flujo es un microfrontend independiente (dominio propio, bundle separado,
              equipo autónomo). El shell orquesta el estado central con Flux y lo difunde
              a los MFs mediante un event bus sobre <code>window</code>.
            </p>
          </div>
          {state.session.isLoggedIn && (
            <div className="row gap-sm wrap">
              <button
                className="button button-secondary"
                onClick={() => lenderaActions.goToStep(Math.max(1, currentStep - 1))}
              >
                Retroceder
              </button>
              <button className="button button-secondary" onClick={lenderaActions.resetApplication}>
                Reiniciar demo
              </button>
            </div>
          )}
        </div>

        {/* ── Layout principal ─────────────────────────────────── */}
        <div className="layout">
          <main className="stack-lg">
            {!state.session.isLoggedIn ? (
              /* mf-auth — dominio: Seguridad / Identidad */
              <MFWrapper name="mf-auth">
                <LoginPanel />
              </MFWrapper>
            ) : (
              <>
                {/* Progreso — renderizado por el shell */}
                <section className="card">
                  <div className="card-header">
                    <h2>Progreso del flujo</h2>
                    <p>Orquestado por el shell — estado difundido vía event bus a cada MF.</p>
                  </div>
                  <div className="card-body stack-sm">
                    <Stepper currentStep={currentStep} />
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${state.progress}%` }} />
                    </div>
                  </div>
                </section>

                {/* Paso activo — MF cargado con lazy + Suspense */}
                <CurrentStepView currentStep={currentStep} />
              </>
            )}
          </main>

          {/* ── Sidebar ────────────────────────────────────────── */}
          <aside className="stack-lg">
            <SummaryPanel />

            <section className="card">
              <div className="card-header">
                <h2>Eventos recientes</h2>
                <p>Notificaciones del store central del shell.</p>
              </div>
              <div className="card-body">
                <NotificationList items={state.application.notifications} />
              </div>
            </section>

            <FluxInspector />

            <section className="card">
              <div className="card-header">
                <h2>Dominios funcionales activos</h2>
              </div>
              <div className="card-body stack-sm">
                {MF_DOMAINS.map((mf) => (
                  <div key={mf.name} className="info-item">
                    <strong>{mf.name}</strong> → :{mf.port} &nbsp;·&nbsp; {mf.desc}
                    <br /><span className="muted" style={{ fontSize: '0.82rem' }}>Equipo: {mf.owner}</span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>

      </div>
    </div>
  );
}
