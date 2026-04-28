import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { initEventBridge } from './eventBridge.js';
import './styles/app.css';

// Inicializa el puente antes de renderizar para que los MFs
// ya puedan comunicarse en cuanto monten sus componentes.
initEventBridge();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
