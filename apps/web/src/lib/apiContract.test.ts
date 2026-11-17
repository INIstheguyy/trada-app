import { describe, expect, test } from 'vitest';
import {
  parseBusinessResponse,
  parseLoginResponse,
  parseProductResponse,
  parseProductsResponse,
  parseRefreshResponse,
  parseSaleResponse,
  parseSalesResponse,
  parseVoiceSaleDraftResponse,
} from './api';

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

describe('product response contract', () => {
  const productionProduct = {
    id: '40fe6275-4729-449f-9715-2b7b3d9015b2',
    name: 'ahaha',
    description: 'jsjsjjs',
    type: 'inventory_based',
    category: 'aaahhah',
    unit: 'piece',
    quantity: '30.00',
    stockThreshold: '0.00',
    costPrice: '200.00',
    sellingPrice: '299.86',
    discountPrice: null,
    condition: 'new',
    location: 'oja',
    sku: 'aaaha',
    barcode: 'aaaaa',
    isActive: true,
  };

  test('normalizes production decimal strings after a successful create', () => {
    const result = parseProductResponse({
      success: true,
      message: 'Product created successfully',
      data: { ...productionProduct, stockThreshold: 0, sellingPrice: 299.86 },
    });

    expect(result).toMatchObject({
      quantity: 30,
      stockThreshold: 0,
      costPrice: 200,
      sellingPrice: 299.86,
      discountPrice: null,
    });
  });

  test('normalizes product-list decimals without dropping the response', () => {
    const result = parseProductsResponse({
      success: true,
      message: 'Products fetched successfully',
      data: [productionProduct],
      pagination: {
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    });

    expect(result.products).toHaveLength(1);
    expect(result.products[0]).toMatchObject({
      quantity: 30,
      stockThreshold: 0,
      costPrice: 200,
      sellingPrice: 299.86,
    });
  });
});

describe('sale response contract', () => {
  const productionSale = {
    id: '8db572b7-45d1-47ae-8b8e-80cbc1b3af78',
    receiptNumber: 'TRD-20261113-278521',
    customerName: null,
    customerPhone: null,
    customerEmail: null,
    subtotal: '900.00',
    discountAmount: '0.00',
    taxAmount: '0.00',
    totalAmount: '900.00',
    amountPaid: '0.00',
    balanceDue: '900.00',
    paymentMethod: 'pos',
    paymentStatus: 'unpaid',
    status: 'completed',
    notes: null,
    createdAt: '2026-11-13T17:46:12.575Z',
    updatedAt: '2026-11-13T17:46:12.575Z',
    items: [
      {
        id: '2fcfc303-6255-4095-8073-ef388b4064af',
        productId: '40fe6275-4729-449f-9715-2b7b3d9015b2',
        productName: 'ahaha',
        sku: 'aaaha',
        costPrice: '200.00',
        unitPrice: '300.00',
        quantity: '3.00',
        subtotal: '900.00',
        discountAmount: '0.00',
        total: '900.00',
      },
    ],
  };

  test('normalizes production decimal strings after a successful sale', () => {
    const result = parseSaleResponse({
      success: true,
      message: 'Sale recorded successfully',
      data: productionSale,
    });

    expect(result).toMatchObject({
      subtotal: 900,
      totalAmount: 900,
      amountPaid: 0,
      balanceDue: 900,
    });
    expect(result.items[0]).toMatchObject({
      costPrice: 200,
      unitPrice: 300,
      quantity: 3,
      subtotal: 900,
      total: 900,
    });
  });

  test('normalizes sale-list decimals without dropping the response', () => {
    const result = parseSalesResponse({
      success: true,
      data: [productionSale],
      pagination: {
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    });

    expect(result.sales).toHaveLength(1);
    expect(result.sales[0].totalAmount).toBe(900);
    expect(result.sales[0].items[0].quantity).toBe(3);
  });
});

describe('voice sale draft contract', () => {
  test('accepts the documented non-persisted voice sale draft', () => {
    const result = parseVoiceSaleDraftResponse({
      success: true,
      message: 'Sale draft extracted from voice',
      data: {
        transcript: 'Musa buy 3 bags of rice, transfer 120k',
        sale: {
          customerName: 'Musa',
          totalAmount: '120000.00',
          amountPaid: '120000.00',
          paymentMethod: 'transfer',
          paymentStatus: 'paid',
          items: [
            {
              productId: 'rice-prod-uuid',
              productName: 'Rice 50kg',
              quantity: '3.00',
              unitPrice: '40000.00',
              totalPrice: '120000.00',
            },
          ],
        },
        extractedFields: {
          customerName: 'Musa',
          amountPaid: 120000,
          paymentMethod: 'transfer',
        },
      },
    });

    expect(result.sale).toMatchObject({ totalAmount: 120000, amountPaid: 120000 });
    expect(result.sale?.items[0]).toMatchObject({ quantity: 3, unitPrice: 40000 });
  });

  test('accepts an extracted-fields-only draft when the backend returns sale as null', () => {
    const result = parseVoiceSaleDraftResponse({
      success: true,
      message: 'Sale draft extracted from voice',
      data: {
        transcript: 'Sold 4 spanners and collected 1k cash.',
        sale: null,
        extractedFields: {
          items: [
            {
              productId: '99514db9-977c-46b3-8887-11a9b0a58524',
              quantity: 4,
              unitPrice: 1000,
            },
          ],
          paymentMethod: 'cash',
          paymentStatus: 'paid',
          amountPaid: 1000,
        },
      },
    });

    expect(result.sale).toBeNull();
    expect(result.extractedFields?.items?.[0]).toMatchObject({ quantity: 4, unitPrice: 1000 });
  });
});
