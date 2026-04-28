import React from 'react';
import ReactDOM from 'react-dom/client';
import PersonalDataStep from './PersonalDataStep.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ background: '#dbeafe', color: '#1d4ed8', borderRadius: '12px', padding: '12px 16px', marginBottom: '16px', fontSize: '0.85rem' }}>
        <strong>mf-onboarding</strong> — modo standalone · En integración, el shell proporciona el CSS y el event bus.
      </div>
      <PersonalDataStep />
    </div>
  </React.StrictMode>
);
