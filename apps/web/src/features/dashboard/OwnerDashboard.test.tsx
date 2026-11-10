// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { afterEach, expect, test, vi } from 'vitest';
import { store } from '../../app/store';
import { OwnerDashboard } from './OwnerDashboard';

const mockState = vi.hoisted(() => ({ lowStockError: false }));

vi.mock('../../lib/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../lib/api')>();
  const queryState = () => ({
    isLoading: false,
    isFetching: false,
    isError: false,
    refetch: vi.fn(),
  });
  return {
    ...actual,
    useGetSalesAnalyticsQuery: () => ({
      ...queryState(),
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
    useGetLowStockProductsQuery: () => ({
      ...queryState(),
      isError: mockState.lowStockError,
      data: mockState.lowStockError ? undefined : [],
    }),
    useGetSalesQuery: () => ({
      ...queryState(),
      data: {
        sales: [],
        pagination: {
          total: 0,
          page: 1,
          limit: 5,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false,
        },
      },
    }),
  };
});

afterEach(() => {
  cleanup();
  mockState.lowStockError = false;
});

test('keeps revenue, cash, qualified profit and unpaid balance distinct', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <OwnerDashboard />
      </MemoryRouter>
    </Provider>,
  );

  expect(screen.getByText('Sales today')).toBeInTheDocument();
  expect(screen.getByText('Cash received')).toBeInTheDocument();
  expect(screen.getByText('Gross profit')).toBeInTheDocument();
  expect(screen.getByText('Unpaid sale balance')).toBeInTheDocument();
  expect(screen.getByText('Unavailable')).toBeInTheDocument();
  expect(screen.getByText('This is not a verified customer debtor ledger')).toBeInTheDocument();
});

test('keeps available dashboard sections visible when one endpoint fails', () => {
  mockState.lowStockError = true;
  render(
    <Provider store={store}>
      <MemoryRouter>
        <OwnerDashboard />
      </MemoryRouter>
    </Provider>,
  );

  expect(screen.getByText('Sales today')).toBeInTheDocument();
  expect(screen.getByText('Partial data')).toBeInTheDocument();
  expect(screen.getByText('Low-stock data is unavailable.')).toBeInTheDocument();
  expect(screen.getByText('No sales recorded today.')).toBeInTheDocument();
});
