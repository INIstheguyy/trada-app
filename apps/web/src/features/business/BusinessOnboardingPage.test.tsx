// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test, vi } from 'vitest';
import { BusinessOnboardingPage } from './BusinessOnboardingPage';

const mocks = vi.hoisted(() => ({
  createBusiness: vi.fn(),
  refetch: vi.fn(),
}));

vi.mock('../../lib/api', () => ({
  useGetMyBusinessQuery: () => ({
    data: undefined,
    error: { status: 404 },
    isLoading: false,
    isFetching: false,
    refetch: mocks.refetch,
  }),
  useCreateBusinessMutation: () => [mocks.createBusiness, { isLoading: false }],
}));

describe('business onboarding', () => {
  test('collects the required private-workspace fields without publication controls', () => {
    render(
      <MemoryRouter initialEntries={['/onboarding/business']}>
        <BusinessOnboardingPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Create your workspace' })).toBeInTheDocument();
    expect(screen.getByLabelText('Business name')).toBeRequired();
    expect(screen.getByLabelText('Business description')).toBeRequired();
    expect(screen.getByLabelText('Industry')).toBeRequired();
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create business' })).toBeEnabled();
  });
});
