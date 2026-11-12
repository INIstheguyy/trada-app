import { describe, expect, test } from 'vitest';
import { parseLoginResponse, parseRefreshResponse } from './api';

describe('authentication response compatibility', () => {
  test('accepts the production login token pair without an embedded user', () => {
    const result = parseLoginResponse({
      success: true,
      message: 'Login successful',
      data: {
        token: 'production-access-token',
        refreshToken: 'production-refresh-token',
      },
    });

    expect(result).toEqual({
      accessToken: 'production-access-token',
      refreshToken: 'production-refresh-token',
      user: undefined,
    });
  });

  test('keeps compatibility with the documented accessToken and user response', () => {
    const result = parseLoginResponse({
      success: true,
      data: {
        accessToken: 'documented-access-token',
        refreshToken: 'documented-refresh-token',
        user: {
          id: 'user-1',
          firstName: 'Ada',
          lastName: 'Okafor',
          email: 'ada@example.com',
          role: 'owner',
        },
      },
    });

    expect(result.user?.role).toBe('owner');
    expect(result.accessToken).toBe('documented-access-token');
  });

  test('accepts token as the access-token key during refresh', () => {
    expect(
      parseRefreshResponse({
        success: true,
        data: { token: 'refreshed-access-token' },
      }),
    ).toEqual({ accessToken: 'refreshed-access-token' });
  });
});