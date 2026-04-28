import React, { useMemo } from 'react';
import { useLenderaStore } from '../hooks/useLenderaStore.js';

export function FluxInspector() {
  const state = useLenderaStore();

  const snapshot = useMemo(
    () =>
      JSON.stringify(
        {
          session: state.session,
          application: {
            currentStep:      state.application.currentStep,
            kycStatus:        state.application.kycStatus,
            documentsStatus:  state.application.documentsStatus,
            approvalStatus:   state.application.approvalStatus,
            personalData:     state.application.personalData,
          },
          progress: state.progress,
        },
        null,
        2
      ),
    [state]
  );

  return (
    <section className="card">
      <div className="card-header">
        <h2>Inspector de estado — Shell</h2>
        <p>
          Estado centralizado del shell. Los MFs reciben este estado
          vía <code>lendera:state</code> y reaccionan sin acoplarse al store.
        </p>
      </div>
      <div className="card-body">
        <pre className="code-block">{snapshot}</pre>
      </div>
    </section>
  );
}
