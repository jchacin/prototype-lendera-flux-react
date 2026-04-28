import React from 'react';
import { steps } from '../constants.js';

export function Stepper({ currentStep }) {
  return (
    <div className="step-grid">
      {steps.map((step) => {
        const active = currentStep === step.id;
        const done   = currentStep > step.id;
        return (
          <div key={step.id} className={`step-card ${active ? 'step-card-active' : ''}`}>
            <div className={`step-icon ${done ? 'step-icon-done' : active ? 'step-icon-active' : ''}`}>
              {done ? '✓' : step.emoji}
            </div>
            <div>
              <div className="step-label">Paso {step.id}</div>
              <div className="step-title">{step.title}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
