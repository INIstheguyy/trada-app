// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { AppShell } from '@trada/ui';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import { getMerchantNavigation } from './navigation';

afterEach(cleanup);

test('uses client navigation and hides unavailable merchant destinations', () => {
  const onNavigate = vi.fn();
  render(
    <AppShell
      navigation={getMerchantNavigation('user')}
      onNavigate={onNavigate}
      recordSaleHref="/sales/new"
    >
      <p>Workspace</p>
    </AppShell>,
  );

  expect(screen.queryByRole('link', { name: 'Storefront' })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Reports' })).not.toBeInTheDocument();
  fireEvent.click(screen.getAllByRole('link', { name: 'Sales' })[0]);
  expect(onNavigate).toHaveBeenCalledWith('/sales');
  fireEvent.click(screen.getByRole('link', { name: 'Record a sale' }));
  expect(onNavigate).toHaveBeenCalledWith('/sales/new');
});

test('opens an account menu before signing out', () => {
  const onSignOut = vi.fn();
  render(
    <AppShell userName="Ada Okon" userRole="owner" onSignOut={onSignOut}>
      <p>Workspace</p>
    </AppShell>,
  );

  fireEvent.click(screen.getByRole('button', { name: 'Open account menu' }));
  expect(onSignOut).not.toHaveBeenCalled();
  expect(screen.getByRole('menu')).toHaveTextContent('Ada Okon');

  fireEvent.click(screen.getByRole('menuitem', { name: 'Sign out' }));
  expect(onSignOut).toHaveBeenCalledOnce();
});
