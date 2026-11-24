import * as React from 'react';

export const base = import.meta.env.BASE_URL;

function currentPath(): string {
  const path = window.location.pathname.startsWith(base)
    ? window.location.pathname.slice(base.length)
    : '';
  return path.replace(/\/$/u, '');
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener('popstate', onChange);
  return () => window.removeEventListener('popstate', onChange);
}

export function usePath(): string {
  return React.useSyncExternalStore(subscribe, currentPath);
}

export function navigate(to: string): void {
  window.history.pushState(null, '', `${base}${to}`);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0 });
}
