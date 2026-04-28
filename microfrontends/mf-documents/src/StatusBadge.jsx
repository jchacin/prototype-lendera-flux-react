import React from 'react';

const config = {
  idle:      { label: 'Pendiente',    className: 'badge badge-neutral' },
  loading:   { label: 'En proceso',   className: 'badge badge-warning' },
  success:   { label: 'Completado',   className: 'badge badge-success' },
  error:     { label: 'Error',        className: 'badge badge-danger'  },
  reviewing: { label: 'En revisión',  className: 'badge badge-info'    },
  approved:  { label: 'Aprobado',     className: 'badge badge-success' },
  rejected:  { label: 'Rechazado',    className: 'badge badge-danger'  },
  draft:     { label: 'Borrador',     className: 'badge badge-neutral' },
};

export function StatusBadge({ status }) {
  const item = config[status] ?? config.idle;
  return <span className={item.className}>{item.label}</span>;
}
