import { describe, expect, test } from 'vitest';
import { can, normalizeRole } from '../../app/permissions';
import { authReducer, sessionEstablished, signedOut } from './authSlice';

const session = {
  accessToken: 'access-token',
  refreshToken: 'refresh-token',
  user: {
    id: 'user-1',
    firstName: 'Tola',
    lastName: 'Okafor',
    email: 'tola@example.com',
    role: 'user',
  },
};

describe('authentication state', () => {
  test('establishes and clears a session', () => {
    const authenticated = authReducer(undefined, sessionEstablished(session));
    expect(authenticated).toEqual(session);
    expect(authReducer(authenticated, signedOut()).accessToken).toBeNull();
  });

  test('keeps the undocumented backend user role least-privileged', () => {
    const role = normalizeRole('user');
    expect(can(role, 'dashboard:view')).toBe(true);
    expect(can(role, 'sale:create')).toBe(true);
    expect(can(role, 'sale:cancel')).toBe(false);
    expect(can(role, 'product:create')).toBe(true);
    expect(can(role, 'product:delete')).toBe(false);
    expect(can(role, 'approval:review')).toBe(false);
    expect(normalizeRole('unexpected-role')).toBe('user');
  });
});
