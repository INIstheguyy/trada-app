// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { expect, test, vi } from 'vitest';
import { BusinessSettingsPage } from './BusinessSettingsPage';

const mocks = vi.hoisted(() => ({
  business: {
    id: 'business-1',
    name: 'Tola Stores',
    description: 'Everyday goods',
    category: 'Inventory based',
    currency: 'NGN',
    industry: 'Retail',
    isLive: false,
  },
}));

vi.mock('../../lib/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../lib/api')>();
  return {
    ...actual,
    useGetMyBusinessQuery: () => ({
      data: mocks.business,
      isLoading: false,
      isFetching: false,
      isError: false,
      refetch: vi.fn(),
    }),
    useUpdateBusinessMutation: () => [vi.fn(), { isLoading: false }],
  };
});

test('edits private workspace identity without exposing publication or staff controls', () => {
  render(
    <MemoryRouter>
      <BusinessSettingsPage />
    </MemoryRouter>,
  );
  expect(screen.getByRole('heading', { name: 'Business identity' })).toBeInTheDocument();
  expect(screen.getByLabelText(/^Business name/)).toBeRequired();
  expect(screen.getByLabelText(/^Business description/)).toBeRequired();
  expect(screen.getAllByText('Private workspace')).toHaveLength(2);
  expect(screen.getByText('Contract pending')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /publish/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /invite/i })).not.toBeInTheDocument();
});
