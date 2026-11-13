import { describe, expect, test } from 'vitest';
import { capabilities, isCapabilityAvailable } from './capabilities';
import { getMerchantNavigation } from './navigation';

describe('product capability guardrails', () => {
  test('exposes only contract-backed merchant destinations', () => {
    expect(getMerchantNavigation('user').map((item) => item.label)).toEqual([
      'Overview',
      'Sales',
      'Inventory',
      'Settings',
    ]);
    expect(getMerchantNavigation('user').map((item) => item.href)).not.toContain('/storefront');
    expect(getMerchantNavigation('user').map((item) => item.href)).not.toContain('/reports');
  });

  test('keeps speculative and separate-track domains unavailable', () => {
    expect(isCapabilityAvailable('storefront')).toBe(false);
    expect(isCapabilityAvailable('bnpl')).toBe(false);
    expect(isCapabilityAvailable('adminPortal')).toBe(false);
    expect(capabilities.bnpl.status).toBe('product-unapproved');
    expect(capabilities.adminPortal.status).toBe('separate-track');
  });

  test('combines capability and RBAC visibility', () => {
    expect(getMerchantNavigation('staff').map((item) => item.label)).toEqual([
      'Sales',
      'Inventory',
    ]);
  });
});
