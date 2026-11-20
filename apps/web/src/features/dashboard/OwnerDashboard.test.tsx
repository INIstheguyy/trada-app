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

test('shows available analytics and an explicit placeholder for inventory value', () => {
  renderDashboard();
  expect(screen.getByText("Today's sales")).toBeInTheDocument();
  expect(screen.getByText("Today's gross profit")).toBeInTheDocument();
  expect(screen.getByText('Inventory value')).toBeInTheDocument();
  expect(screen.getByText('Unpaid sale balance')).toBeInTheDocument();
  expect(screen.getByLabelText('Data unavailable')).toHaveTextContent('—');
  expect(screen.queryByText('Qualified')).not.toBeInTheDocument();
});

test('omits date query parameters for the current-date dashboard request', () => {
  renderDashboard();

  expect(mockState.analyticsParams).toEqual({});
  expect(mockState.salesParams).toEqual({
    page: 1,
    limit: 5,
    sortBy: 'createdAt',
    sortOrder: 'DESC',
  });
});

test('keeps the greeting and summary above the grouped middle actions', () => {
  renderDashboard();
  const greeting = screen.getByRole('heading', { level: 1 });
  const summary = screen.getByLabelText(/Business summary for/);
  const quickActions = screen.getByRole('heading', { name: 'Quick actions' }).closest('section');
  const storePreview = screen.getByRole('heading', { name: 'Share your store' }).closest('section');

  expect(greeting.compareDocumentPosition(summary) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(summary.compareDocumentPosition(quickActions!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(quickActions?.parentElement).toHaveClass('dashboard-middle');
  expect(storePreview?.parentElement).toBe(quickActions?.parentElement);
});

test('changes analytics and recent sales queries with the selected period', () => {
  renderDashboard();
  fireEvent.click(screen.getByRole('button', { name: '7 days' }));

  expect(mockState.analyticsParams).toEqual(
    mockState.salesParams && {
      startDate: mockState.salesParams.startDate,
      endDate: mockState.salesParams.endDate,
    },
  );
  const start = new Date(`${mockState.analyticsParams?.startDate}T00:00:00Z`);
  const end = new Date(`${mockState.analyticsParams?.endDate}T00:00:00Z`);
  expect((end.getTime() - start.getTime()) / 86_400_000).toBe(6);
  expect(screen.getByText('Sales revenue')).toBeInTheDocument();
});

test('shows available quick actions and keeps low stock behind a count toggle', () => {
  renderDashboard();
  const recordSale = screen.getByRole('link', { name: /Record sale/ });
  expect(recordSale).toHaveAttribute('href', '/sales/new');
  expect(screen.getByRole('link', { name: /Add product/ })).toHaveAttribute('href', '/products/new');
  expect(screen.getByRole('link', { name: /Inventory/ })).toHaveAttribute('href', '/products');
  const lowStockToggle = screen.getByRole('button', { name: /Low stock/ });
  expect(lowStockToggle.parentElement?.firstElementChild).toBe(lowStockToggle);
  expect(lowStockToggle.parentElement?.lastElementChild).toBe(recordSale);
  expect(lowStockToggle).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(lowStockToggle);
  expect(lowStockToggle).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByText('Stock levels look healthy right now.')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Coming soon' })).not.toBeInTheDocument();
  expect(screen.queryByText(/^Updated /)).not.toBeInTheDocument();
});

test('keeps available dashboard sections visible when one endpoint fails', () => {
  mockState.lowStockError = true;
  renderDashboard();
  expect(screen.getByText("Today's sales")).toBeInTheDocument();
  expect(screen.getByText(/Some dashboard information could not be loaded/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Low stock/ }));
  expect(screen.getByText('Low-stock data is unavailable.')).toBeInTheDocument();
  expect(screen.getByText('No sales recorded today.')).toBeInTheDocument();
});

test('queries a selected calendar day as an inclusive single-day range', () => {
  renderDashboard();
  fireEvent.change(screen.getByLabelText('Dashboard date'), { target: { value: '2026-11-18' } });
  expect(mockState.analyticsParams).toEqual({ startDate: '2026-11-18', endDate: '2026-11-18' });
  expect(mockState.salesParams).toMatchObject({ startDate: '2026-11-18', endDate: '2026-11-18' });
});
