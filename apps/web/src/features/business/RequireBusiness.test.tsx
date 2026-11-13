// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, expect, test, vi } from 'vitest';
import { RequireBusiness } from './RequireBusiness';

const mocks = vi.hoisted(() => ({
  status: 404 as number,
  refetch: vi.fn(),
}));

vi.mock('../../lib/api', () => ({
  useGetMyBusinessQuery: () => ({
    data: undefined,
    error: { status: mocks.status },
    isLoading: false,
    isFetching: false,
    refetch: mocks.refetch,
  }),
}));

describe('business route gate', () => {
  test('sends an authenticated account without a business to onboarding', () => {
    mocks.status = 404;
    render(
      <MemoryRouter initialEntries={['/products']}>
        <Routes>
          <Route
            path="/products"
            element={
              <RequireBusiness>
                <p>Products</p>
              </RequireBusiness>
            }
          />
          <Route path="/onboarding/business" element={<p>Business onboarding</p>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Business onboarding')).toBeInTheDocument();
    expect(screen.queryByText('Products')).not.toBeInTheDocument();
  });

  test('keeps server failures out of the onboarding path', () => {
    mocks.status = 500;
    render(
      <MemoryRouter initialEntries={['/products']}>
        <RequireBusiness>
          <p>Products</p>
        </RequireBusiness>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'We couldn’t load your business' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeEnabled();
  });
});
