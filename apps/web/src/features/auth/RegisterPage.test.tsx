// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { expect, test } from 'vitest';
import { store } from '../../app/store';
import { RegisterPage } from './RegisterPage';

test('rejects mismatched passwords before registration', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    </Provider>,
  );

  fireEvent.change(screen.getByLabelText('First name'), { target: { value: 'Tola' } });
  fireEvent.change(screen.getByLabelText('Last name'), { target: { value: 'Okafor' } });
  fireEvent.change(screen.getByLabelText('Email address'), {
    target: { value: 'tola@example.com' },
  });
  fireEvent.change(screen.getByLabelText('Phone number'), { target: { value: '08012345678' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password123' } });
  fireEvent.change(screen.getByLabelText('Confirm password'), {
    target: { value: 'Different123' },
  });
  fireEvent.submit(screen.getByRole('button', { name: 'Create account' }).closest('form')!);

  expect(screen.getByRole('alert')).toHaveTextContent('The passwords do not match.');
});
