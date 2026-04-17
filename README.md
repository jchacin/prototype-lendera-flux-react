# Lendera Flux React

Mini-prototipo del flujo de microcrédito de **Lendera** implementado en **React** con una arquitectura inspirada en **Flux**.

## Estructura

```text
src/
  actions/
    lenderaActions.js
  components/
    DocumentsStep.jsx
    FluxInspector.jsx
    KycStep.jsx
    LoginPanel.jsx
    NotificationList.jsx
    PersonalDataStep.jsx
    ResultStep.jsx
    StatusBadge.jsx
    Stepper.jsx
    SummaryPanel.jsx
  flux/
    dispatcher.js
    lenderaStore.js
  hooks/
    useLenderaStore.js
  styles/
    app.css
  App.jsx
  constants.js
  main.jsx
```

## Cómo ejecutar

```bash
npm install
npm run dev
```

## Qué demuestra este prototipo

- Flujo unidireccional: **Vista → Acción → Dispatcher → Store → Vista**.
- Estado centralizado para el dominio: sesión, progreso, KYC, documentos y aprobación.
- Estado local solo para la captura temporal de formularios.
- Asincronía simulada para validación de identidad, carga documental y evaluación.
