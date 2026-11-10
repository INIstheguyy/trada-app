// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { expect, test, vi } from 'vitest';
import { store } from '../../app/store';
import { SaleCheckoutPage } from './SaleCheckoutPage';

vi.mock('../../lib/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../lib/api')>();
  return {
    ...actual,
    useGetProductsQuery: () => ({
      data: { products: [], total: 0, page: 1, limit: 100, totalPages: 0 },
      isLoading: false,
    }),
    useCreateSaleMutation: () => [vi.fn(), { isLoading: false }],
  };
});

test('keeps booked revenue, received cash and outstanding balance distinct', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <SaleCheckoutPage />
      </MemoryRouter>
    </Provider>,
  );

  expect(screen.getByText('Booked revenue')).toBeInTheDocument();
  expect(screen.getByText('Amount received')).toBeInTheDocument();
  expect(screen.getByText('Balance due')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Confirm and record sale' })).toBeInTheDocument();
});
