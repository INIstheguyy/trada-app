import { describe, expect, test } from 'vitest';
import { readApiError } from './apiError';

describe('API error feedback', () => {
  test('uses safe status-specific messages for authentication and authorization failures', () => {
    expect(readApiError({ status: 401 }, 'fallback')).toContain('session has expired');
    expect(readApiError({ status: 403 }, 'fallback')).toContain('do not have permission');
  });

  test('distinguishes connectivity and unverified-response failures', () => {
    expect(readApiError({ status: 'FETCH_ERROR' }, 'fallback')).toContain('could not reach');
    expect(readApiError({ status: 'PARSING_ERROR' }, 'fallback')).toContain('could not verify');
  });

  test('preserves useful backend business messages and otherwise uses the fallback', () => {
    expect(readApiError({ status: 400, data: { message: 'Insufficient stock' } }, 'fallback')).toBe(
      'Insufficient stock',
    );
    expect(readApiError({ status: 500, data: {} }, 'fallback')).toBe('fallback');
  });
});
