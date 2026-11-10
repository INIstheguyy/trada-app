import type { AuthState } from './authSlice';

const storageKey = 'trada.auth.session';

export function loadAuthSession(): AuthState | undefined {
  if (typeof window === 'undefined') return undefined;

  try {
    const value = window.sessionStorage.getItem(storageKey);
    return value ? (JSON.parse(value) as AuthState) : undefined;
  } catch {
    return undefined;
  }
}

export function saveAuthSession(session: AuthState) {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(storageKey, JSON.stringify(session));
}

export function clearAuthSession() {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem(storageKey);
}
