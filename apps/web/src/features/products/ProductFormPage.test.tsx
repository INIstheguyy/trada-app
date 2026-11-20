// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';
import { afterEach, expect, test } from 'vitest';
import { store } from '../../app/store';
import { ProductFormPage } from './ProductFormPage';

afterEach(cleanup);

function renderNewProduct() {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/products/new']}>
        <Routes>
          <Route path="/products/new" element={<ProductFormPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
}

test('separates voice, image and manual product capture from the entry choice', () => {
  renderNewProduct();

  expect(
    screen.getByRole('heading', { name: 'How would you like to add this product?' }),
  ).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Record with voice' })).toBeInTheDocument();
  expect(screen.getByLabelText('Product image')).toHaveAttribute('capture', 'environment');
  expect(screen.queryByLabelText(/^Product name/)).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Record with voice' }));
  expect(screen.getByRole('heading', { name: 'Recording starts in 3' })).toBeInTheDocument();
  expect(document.querySelector('.focused-capture__wave')).toBeInTheDocument();
});

test('collects the critical product, price and stock fields in manual review', () => {
  renderNewProduct();

  fireEvent.click(screen.getByRole('button', { name: 'Type manually' }));

  expect(screen.getByRole('heading', { name: 'Add a product' })).toBeInTheDocument();
  expect(screen.getByLabelText(/^Product name/)).toBeRequired();
  expect(screen.getByLabelText(/^Selling price \(₦\)/)).toBeRequired();
  expect(screen.getByLabelText(/^Quantity/)).toBeRequired();
  expect(screen.getByLabelText(/^Low-stock threshold/)).toBeRequired();
  expect(screen.getByRole('checkbox', { name: /Active product/ })).toBeChecked();
  expect(screen.getByText('Must be unique when provided.')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Save product' })).toBeInTheDocument();
});
