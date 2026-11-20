// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { afterEach, expect, test, vi } from 'vitest';
import { store } from '../../app/store';
import { SaleCheckoutPage } from './SaleCheckoutPage';

const mocks = vi.hoisted(() => ({ createVoiceSaleDraft: vi.fn() }));

afterEach(() => {
  cleanup();
  mocks.createVoiceSaleDraft.mockReset();
});

vi.mock('../../lib/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../lib/api')>();
  return {
    ...actual,
    useGetProductsQuery: () => ({
      data: { products: [], total: 0, page: 1, limit: 100, totalPages: 0 },
      isLoading: false,
    }),
    useCreateSaleMutation: () => [vi.fn(), { isLoading: false }],
    useCreateVoiceSaleDraftMutation: () => [mocks.createVoiceSaleDraft, { isLoading: false }],
  };
});

test('opens the manual sale form directly by default', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <SaleCheckoutPage />
      </MemoryRouter>
    </Provider>,
  );

  expect(screen.getByText('Booked revenue')).toBeInTheDocument();
  expect(screen.getAllByText('Amount received')).toHaveLength(2);
  expect(screen.getByText('Balance due')).toBeInTheDocument();
  expect(screen.getByText('Record only money already received.')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Confirm and record sale' })).toBeInTheDocument();
});

test('shows the voice countdown before requesting microphone access', () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/sales/new?mode=voice']}>
        <SaleCheckoutPage />
      </MemoryRouter>
    </Provider>,
  );

  expect(screen.getByRole('heading', { name: 'Recording starts in 3' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Starting in 3' })).toBeDisabled();
  expect(document.querySelector('.focused-capture__wave')).toBeInTheDocument();
});

test('prepares a non-persisted voice draft before it changes checkout', async () => {
  mocks.createVoiceSaleDraft.mockReturnValue({
    unwrap: async () => ({
      transcript: 'Musa bought three bags of rice and paid 120k by transfer.',
      sale: {
        customerName: 'Musa',
        amountPaid: 120000,
        paymentMethod: 'transfer',
        items: [],
      },
    }),
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/sales/new?mode=voice']}>
        <SaleCheckoutPage />
      </MemoryRouter>
    </Provider>,
  );

  fireEvent.change(screen.getByLabelText('Sale description'), {
    target: { value: 'Musa bought three bags of rice and paid 120k by transfer.' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Prepare typed draft' }));

  await waitFor(() =>
    expect(mocks.createVoiceSaleDraft).toHaveBeenCalledWith({
      text: 'Musa bought three bags of rice and paid 120k by transfer.',
    }),
  );
  expect(await screen.findByRole('heading', { name: 'Review AI draft' })).toBeInTheDocument();
  expect(
    screen.getByText(
      'No sale has been recorded. Use the normal confirmation button after reviewing the checkout.',
    ),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Review matching details in checkout' }),
  ).toBeDisabled();
  expect(screen.queryByText('Booked revenue')).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Continue with manual checkout' }));
  expect(screen.getByText('Booked revenue')).toBeInTheDocument();
});
