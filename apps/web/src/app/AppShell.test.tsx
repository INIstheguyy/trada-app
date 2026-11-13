// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { AppShell } from '@trada/ui';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { getMerchantNavigation } from './navigation';

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
