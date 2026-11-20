// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';
import { afterEach, expect, test } from 'vitest';
import { store } from '../../app/store';
import { ProductFormPage } from './ProductFormPage';

afterEach(cleanup);

function renderNewProduct(path = '/products/new') {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/products/new" element={<ProductFormPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
}

test('opens the manual product form directly by default', () => {
  renderNewProduct();

  expect(screen.getByLabelText(/^Product name/)).toBeRequired();
  expect(screen.queryByRole('heading', { name: 'How would you like to add this product?' })).not.toBeInTheDocument();
});

test('opens voice and image input stages directly from their selected mode', () => {
  const { unmount } = renderNewProduct('/products/new?mode=voice');
  expect(screen.getByRole('heading', { name: 'Recording starts in 3' })).toBeInTheDocument();
  expect(document.querySelector('.focused-capture__wave')).toBeInTheDocument();
  unmount();

  renderNewProduct('/products/new?mode=image');
  expect(screen.getByRole('heading', { name: 'Add product from image' })).toBeInTheDocument();
  expect(screen.getByLabelText('Product image')).toHaveAttribute('capture', 'environment');
});

test('collects the critical product, price and stock fields in manual review', () => {
  renderNewProduct();

  expect(screen.getByRole('heading', { name: 'Add a product' })).toBeInTheDocument();
  expect(screen.getByLabelText(/^Product name/)).toBeRequired();
  expect(screen.getByLabelText(/^Selling price \(₦\)/)).toBeRequired();
  expect(screen.getByLabelText(/^Quantity/)).toBeRequired();
  expect(screen.getByLabelText(/^Low-stock threshold/)).toBeRequired();
  expect(screen.getByRole('checkbox', { name: /Active product/ })).toBeChecked();
  expect(screen.getByText('Must be unique when provided.')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Save product' })).toBeInTheDocument();
});
