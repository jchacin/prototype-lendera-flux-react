import React, { Suspense } from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-banner">
          <strong>Error al cargar {this.props.name}</strong>
          <br />
          <small>
            Verifica que el microfrontend esté corriendo en su puerto.
            <br />
            {this.state.error?.message}
          </small>
        </div>
      );
    }
    return this.props.children;
  }
}

export function MFWrapper({ name, children }) {
  return (
    <ErrorBoundary name={name}>
      <Suspense
        fallback={
          <div className="info-box">
            Cargando <strong>{name}</strong>...
          </div>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}
