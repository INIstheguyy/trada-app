// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { afterEach, expect, test, vi } from 'vitest';
import { store } from '../../app/store';
import { OwnerDashboard } from './OwnerDashboard';

const mockState = vi.hoisted(() => ({
  lowStockError: false,
  analyticsParams: undefined as { startDate?: string; endDate?: string } | undefined,
  salesParams: undefined as { startDate?: string; endDate?: string } | undefined,
}));

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
    useGetSalesAnalyticsQuery: (params: { startDate?: string; endDate?: string }) => {
      mockState.analyticsParams = params;
      return {
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
      };
    },
    useGetLowStockProductsQuery: () => ({
      ...queryState(),
      isError: mockState.lowStockError,
      data: mockState.lowStockError ? undefined : [],
    }),
    useGetSalesQuery: (params: { startDate?: string; endDate?: string }) => {
      mockState.salesParams = params;
      return {
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
      };
    },
  };
});

afterEach(() => {
  cleanup();
  mockState.lowStockError = false;
  mockState.analyticsParams = undefined;
  mockState.salesParams = undefined;
});

function renderDashboard() {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <OwnerDashboard />
      </MemoryRouter>
    </Provider>,
  );
}

test('keeps revenue, cash, qualified profit and unpaid balance distinct', () => {
  renderDashboard();
  expect(screen.getByText('Sales today')).toBeInTheDocument();
  expect(screen.getByText('Cash received')).toBeInTheDocument();
  expect(screen.getByText('Gross profit')).toBeInTheDocument();
  expect(screen.getByText('Unpaid sale balance')).toBeInTheDocument();
  expect(screen.getByText('Unavailable')).toBeInTheDocument();
  expect(screen.getByText('This is not a verified customer debtor ledger')).toBeInTheDocument();
});

test('changes analytics and recent sales queries with the selected period', () => {
  renderDashboard();
  fireEvent.click(screen.getByRole('button', { name: 'Last 7 days' }));

  expect(mockState.analyticsParams).toEqual(
    mockState.salesParams && {
      startDate: mockState.salesParams.startDate,
      endDate: mockState.salesParams.endDate,
    },
  );
  const start = new Date(`${mockState.analyticsParams?.startDate}T00:00:00Z`);
  const end = new Date(`${mockState.analyticsParams?.endDate}T00:00:00Z`);
  expect((end.getTime() - start.getTime()) / 86_400_000).toBe(6);
  expect(screen.getByText('Sales — last 7 days')).toBeInTheDocument();
});

test('shows only currently available operational next actions', () => {
  renderDashboard();
  expect(screen.getByRole('link', { name: /Record a sale/ })).toHaveAttribute('href', '/sales/new');
  expect(screen.getByRole('link', { name: /Add a product/ })).toHaveAttribute(
    'href',
    '/products/new',
  );
  expect(screen.getByRole('link', { name: /Review inventory/ })).toHaveAttribute(
    'href',
    '/products',
  );
});

test('keeps available dashboard sections visible when one endpoint fails', () => {
  mockState.lowStockError = true;
  renderDashboard();
  expect(screen.getByText('Sales today')).toBeInTheDocument();
  expect(screen.getByText('Partial data')).toBeInTheDocument();
  expect(screen.getByText('Low-stock data is unavailable.')).toBeInTheDocument();
  expect(screen.getByText('No sales recorded today.')).toBeInTheDocument();
});
