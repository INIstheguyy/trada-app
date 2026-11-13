import { describe, expect, test } from 'vitest';
import { parseBusinessResponse, parseLoginResponse, parseRefreshResponse } from './api';

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
describe('business response contract', () => {
  test('accepts the documented owner business response', () => {
    const result = parseBusinessResponse({
      success: true,
      message: 'Business fetched successfully',
      data: {
        id: '11111111-1111-4111-8111-111111111111',
        name: 'Acme Motors',
        description: 'Premium auto parts retailer',
        category: 'Inventory based',
        currency: 'NGN',
        industry: 'Automotive',
        isLive: false,
        user: { id: 'user-1', email: 'private@example.com' },
        createdAt: '2026-11-13T06:17:21.000Z',
        updatedAt: '2026-11-13T06:17:21.000Z',
      },
    });

    expect(result.name).toBe('Acme Motors');
    expect(result.isLive).toBe(false);
    expect(result.user).toEqual({ id: 'user-1' });
  });

  test('rejects a malformed business identifier', () => {
    expect(() =>
      parseBusinessResponse({
        success: true,
        data: {
          id: 'not-a-uuid',
          name: 'Acme Motors',
          description: 'Premium auto parts retailer',
          category: 'Inventory based',
          currency: 'NGN',
          industry: 'Automotive',
          isLive: false,
          user: { id: 'user-1' },
          createdAt: '2026-11-13T06:17:21.000Z',
          updatedAt: '2026-11-13T06:17:21.000Z',
        },
      }),
    ).toThrow();
  });
});
