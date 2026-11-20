// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, expect, test, vi } from 'vitest';
import { SalesListPage } from './SalesListPage';

const mockState = vi.hoisted(() => ({ params: undefined as Record<string, unknown> | undefined }));

vi.mock('../../lib/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../lib/api')>();
  const base = { isLoading: false, isFetching: false, isError: false, refetch: vi.fn() };
  return {
    ...actual,
    useGetSalesQuery: (params: Record<string, unknown>) => {
      mockState.params = params;
      return {
        ...base,
        data: {
          sales: [
            {
              id: 'sale-1',
              receiptNumber: 'TRD-20261119-001',
              customerName: null,
              subtotal: 4000,
              discountAmount: 0,
              taxAmount: 0,
              totalAmount: 4000,
              amountPaid: 4000,
              balanceDue: 0,
              paymentMethod: 'cash' as const,
              paymentStatus: 'paid' as const,
              status: 'completed' as const,
              items: [
                {
                  id: 'item-1',
                  productId: 'product-1',
                  productName: 'Spanner',
                  unitPrice: 1000,
                  quantity: 4,
                  discountAmount: 0,
                  total: 4000,
                },
              ],
              createdAt: '2026-11-19T09:28:00.000Z',
            },
          ],
          pagination: {
            total: 1,
            page: 1,
            limit: 10,
            totalPages: 1,
            hasNextPage: false,
            hasPrevPage: false,
          },
        },
      };
    },
    useGetSalesAnalyticsQuery: () => ({
      ...base,
      data: {
        totalSalesCount: 2,
        totalRevenue: 15000,
        totalCost: 9000,
        grossProfit: 6000,
        totalDiscount: 0,
        totalTax: 0,
        unpaidBalance: 3000,
      },
    }),
  };
});

afterEach(() => {
  cleanup();
  mockState.params = undefined;
});

test('uses the reference hero and keeps summary cards to title and value only', () => {
  render(
    <MemoryRouter>
      <SalesListPage />
    </MemoryRouter>,
  );
  expect(screen.getByRole('heading', { name: 'Sales' })).toBeInTheDocument();
  expect(screen.getByText('Record sales, view performance and track revenue.')).toBeInTheDocument();
  expect(screen.queryByText('Sales activity')).not.toBeInTheDocument();
  expect(screen.getByText('Recorded sales')).toBeInTheDocument();
  expect(screen.getByText('Booked revenue')).toBeInTheDocument();
  expect(screen.getByText('Gross profit')).toBeInTheDocument();
  expect(screen.getByText('Unpaid sale balance')).toBeInTheDocument();
  expect(screen.queryByText('Not a verified customer debtor ledger')).not.toBeInTheDocument();
  expect(screen.queryByText('Qualified')).not.toBeInTheDocument();
});

test('provides direct voice and text sale input modes in the toolbar', () => {
  render(
    <MemoryRouter>
      <SalesListPage />
    </MemoryRouter>,
  );
  const toolbar = screen.getByLabelText('Sales actions');
  expect(screen.getByRole('link', { name: 'New sale with voice' })).toHaveAttribute('href', '/sales/new?mode=voice');
  expect(screen.getByRole('link', { name: 'New sale with text' })).toHaveAttribute('href', '/sales/new');
  expect(toolbar).toBeInTheDocument();
});

test('presents each sale as a compact product, time, payment-method and total row', () => {
  render(
    <MemoryRouter>
      <SalesListPage />
    </MemoryRouter>,
  );
  expect(screen.getByText('Spanner (x4)')).toBeInTheDocument();
  expect(screen.getByText('Cash')).toBeInTheDocument();
  expect(screen.getByText('₦4,000')).toBeInTheDocument();
  expect(screen.queryByText('Received')).not.toBeInTheDocument();
  expect(screen.queryByText('Balance')).not.toBeInTheDocument();
  expect(screen.queryByText('TRD-20261119-001')).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'View TRD-20261119-001' })).toHaveAttribute(
    'href',
    '/sales/sale-1',
  );
});

test('sends supported receipt, payment, sale-status and date filters', () => {
  render(
    <MemoryRouter>
      <SalesListPage />
    </MemoryRouter>,
  );
  expect(screen.queryByRole('search')).not.toBeInTheDocument();
  const filterToggle = screen.getByRole('button', { name: 'Filter' });
  expect(filterToggle).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(filterToggle);
  expect(filterToggle).toHaveAttribute('aria-expanded', 'true');
  fireEvent.change(screen.getByLabelText('Search sales'), { target: { value: 'TR-100' } });
  fireEvent.change(screen.getByLabelText('Payment status'), { target: { value: 'unpaid' } });
  fireEvent.change(screen.getByLabelText('Sale status'), { target: { value: 'completed' } });
  fireEvent.change(screen.getByLabelText('Sales from date'), { target: { value: '2026-11-01' } });
  fireEvent.change(screen.getByLabelText('Sales to date'), { target: { value: '2026-11-13' } });
  fireEvent.submit(screen.getByRole('search'));
  expect(mockState.params).toMatchObject({
    search: 'TR-100',
    paymentStatus: 'unpaid',
    status: 'completed',
    startDate: '2026-11-01',
    endDate: '2026-11-13',
    page: 1,
  });
});
