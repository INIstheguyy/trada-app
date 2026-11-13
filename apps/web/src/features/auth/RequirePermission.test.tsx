// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { expect, test } from 'vitest';
import { authReducer } from './authSlice';
import { RequirePermission } from './ProtectedRoute';

const staffStore = configureStore({
  reducer: { auth: authReducer },
  preloadedState: {
    auth: {
      accessToken: 'token',
      refreshToken: 'refresh',
      user: {
        id: 'staff-1',
        firstName: 'Ada',
        lastName: 'Okon',
        email: 'ada@example.com',
        role: 'staff',
      },
    },
  },
});

test('explains unavailable actions without implying a working role-management flow', () => {
  render(
    <Provider store={staffStore}>
      <MemoryRouter>
        <RequirePermission action="business:update">
          <p>Settings form</p>
        </RequirePermission>
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole('heading', { name: 'This action isn’t available for your account' }),
  ).toBeInTheDocument();
  expect(screen.getByText(/This account cannot update business identity/i)).toHaveTextContent(
    /current interface role is staff/i,
  );
  expect(screen.queryByText(/ask your business owner/i)).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Return to overview' })).toHaveAttribute('href', '/');
});
