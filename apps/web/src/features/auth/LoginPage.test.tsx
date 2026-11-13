// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { expect, test } from 'vitest';
import { store } from '../../app/store';
import { LoginPage } from './LoginPage';

test('shows only the supported email and password sign-in contract', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>,
  );

  expect(screen.getByRole('heading', { name: 'Sign in to Trada' })).toBeInTheDocument();
  expect(screen.getByLabelText('Email address')).toBeRequired();
  expect(screen.getByLabelText('Password')).toBeRequired();
  expect(screen.queryByText(/continue with google/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/one-time password|otp/i)).not.toBeInTheDocument();
  expect(screen.getByText('Keep sales and payments clearly recorded')).toBeInTheDocument();
});
