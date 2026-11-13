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
          sales: [],
          pagination: {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 0,
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

test('keeps sales financial meanings qualified and distinct', () => {
  render(
    <MemoryRouter>
      <SalesListPage />
    </MemoryRouter>,
  );
  expect(screen.getByText('Booked revenue')).toBeInTheDocument();
  expect(screen.getByText('Gross profit')).toBeInTheDocument();
  expect(screen.getByText('Unpaid sale balance')).toBeInTheDocument();
  expect(screen.getByText('Not a verified customer debtor ledger')).toBeInTheDocument();
  expect(screen.getAllByText('Qualified')).toHaveLength(2);
});

test('sends supported receipt, payment, sale-status and date filters', () => {
  render(
    <MemoryRouter>
      <SalesListPage />
    </MemoryRouter>,
  );
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
