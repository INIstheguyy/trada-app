// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { afterEach, expect, test, vi } from 'vitest';
import { store } from '../../app/store';
import { ProductListPage } from './ProductListPage';

const mockState = vi.hoisted(() => ({
  params: undefined as Record<string, unknown> | undefined,
}));

vi.mock('../../lib/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../lib/api')>();
  const queryState = { isLoading: false, isFetching: false, isError: false, refetch: vi.fn() };
  return {
    ...actual,
    useGetProductsQuery: (params: Record<string, unknown>) => {
      mockState.params = params;
      return {
        ...queryState,
        data: {
          products: [
            {
              id: 'product-1',
              name: 'Golden Rice',
              description: null,
              type: 'inventory_based',
              category: 'Food',
              unit: 'bag',
              quantity: 2,
              stockThreshold: 5,
              costPrice: 42000,
              sellingPrice: 50000,
              discountPrice: null,
              condition: 'new',
              location: 'Store',
              sku: 'RICE-01',
              barcode: null,
              isActive: false,
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
    useGetLowStockProductsQuery: () => ({
      ...queryState,
      data: [
        {
          id: 'product-1',
          name: 'Golden Rice',
          quantity: 2,
          stockThreshold: 5,
          unit: 'bag',
          location: 'Store',
        },
      ],
    }),
  };
});

afterEach(() => {
  cleanup();
  mockState.params = undefined;
});

function renderPage() {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>
    </Provider>,
  );
}

test('shows actionable stock and product status without merging their meanings', () => {
  renderPage();
  expect(screen.getByText('1 product needs attention')).toBeInTheDocument();
  expect(screen.getByText('Low stock')).toBeInTheDocument();
  expect(within(screen.getByRole('table')).getByText('Inactive')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Edit Golden Rice' })).toHaveAttribute(
    'href',
    '/products/product-1',
  );
});

test('sends supported type, status and search filters to the product query', () => {
  renderPage();
  fireEvent.change(screen.getByLabelText('Filter by product type'), {
    target: { value: 'inventory_based' },
  });
  fireEvent.change(screen.getByLabelText('Filter by product status'), {
    target: { value: 'inactive' },
  });
  fireEvent.change(screen.getByLabelText('Search products'), { target: { value: 'rice' } });
  fireEvent.submit(screen.getByRole('search'));

  expect(mockState.params).toMatchObject({
    search: 'rice',
    type: 'inventory_based',
    isActive: false,
    page: 1,
  });
});
