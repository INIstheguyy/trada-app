// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
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
    expect(screen.getByLabelText('Business setup, step 1 of 2')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Business name'), {
      target: { value: 'Acme Motors' },
    });
    fireEvent.change(screen.getByLabelText('Business description'), {
      target: { value: 'Automotive parts and servicing' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

    expect(screen.getByLabelText('Business setup, step 2 of 2')).toBeInTheDocument();
  });
});
