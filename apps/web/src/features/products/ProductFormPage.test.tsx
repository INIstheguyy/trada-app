// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';
import { expect, test } from 'vitest';
import { store } from '../../app/store';
import { ProductFormPage } from './ProductFormPage';

test('collects the critical product, price and stock fields', () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/products/new']}>
        <Routes>
          <Route path="/products/new" element={<ProductFormPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );

  expect(screen.getByRole('heading', { name: 'Add a product' })).toBeInTheDocument();
  expect(screen.getByLabelText(/^Product name/)).toBeRequired();
  expect(screen.getByLabelText(/^Selling price \(₦\)/)).toBeRequired();
  expect(screen.getByLabelText(/^Quantity/)).toBeRequired();
  expect(screen.getByLabelText(/^Low-stock threshold/)).toBeRequired();
  expect(screen.getByRole('checkbox', { name: /Active product/ })).toBeChecked();
  expect(screen.getByText('Must be unique when provided.')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Save product' })).toBeInTheDocument();
});
