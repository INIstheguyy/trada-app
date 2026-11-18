// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
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

  expect(screen.getByRole('heading', { name: 'Welcome back' })).toBeInTheDocument();
  expect(screen.getByLabelText('Email address')).toBeRequired();
  expect(screen.getByLabelText('Password')).toBeRequired();
  expect(screen.queryByText(/continue with google/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/one-time password|otp/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/workspace is available only/i)).not.toBeInTheDocument();
  expect(screen.getByText('Know Your Business')).toBeInTheDocument();
  expect(document.documentElement).toHaveClass('access-viewport-locked');

  const panel = document.getElementById('access-account-panel');
  expect(panel).not.toHaveClass('is-mobile-open');

  fireEvent.click(screen.getByRole('button', { name: 'Sign in', expanded: false }));
  expect(panel).toHaveClass('is-mobile-open');

  fireEvent.click(screen.getByRole('button', { name: 'Close sign in form' }));
  expect(panel).not.toHaveClass('is-mobile-open');
});
