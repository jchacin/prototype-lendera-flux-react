import React from 'react';

export function NotificationList({ items }) {
  if (!items.length) {
    return <p className="muted">Aún no hay eventos en el flujo.</p>;
  }

  return (
    <div className="stack-sm">
      {items.map((item) => (
        <div
          key={item.id}
          className={`notification ${
            item.tone === 'success'
              ? 'notification-success'
              : item.tone === 'error'
              ? 'notification-error'
              : 'notification-default'
          }`}
        >
          {item.message}
        </div>
      ))}
    </div>
  );
}
