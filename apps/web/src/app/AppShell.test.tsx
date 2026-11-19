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

test('opens the central AI voice launcher and routes only to draft-safe workflows', () => {
  const onNavigate = vi.fn();
  render(
    <AppShell
      navigation={getMerchantNavigation('user')}
      onNavigate={onNavigate}
      aiActions={[
        {
          id: 'voice-sale',
          label: 'Record a sale by voice',
          description: 'Review a sale draft before recording it.',
          href: '/sales/new?ai=voice',
          icon: 'sales',
        },
        {
          id: 'voice-product',
          label: 'Add a product by voice',
          description: 'Review a product draft before saving it.',
          href: '/products/new?ai=voice',
          icon: 'inventory',
        },
      ]}
      aiBriefing={{
        title: 'Your business briefing',
        summary: 'Two sales were recorded today. One product needs restocking.',
        status: 'From recorded data',
        meta: 'Today · 9:41 AM',
      }}
    >
      <p>Workspace</p>
    </AppShell>,
  );

  fireEvent.click(screen.getByRole('button', { name: 'Open AI voice assistant' }));
  expect(screen.getByRole('dialog')).toHaveTextContent('What would you like to capture?');
  expect(screen.getByRole('dialog')).toHaveTextContent('Your business briefing');
  expect(screen.getByRole('dialog')).toHaveTextContent('Two sales were recorded today.');
  expect(screen.getByText('Voice results are drafts. You review and confirm every sale or product yourself.')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('link', { name: /Record a sale by voice/ }));
  expect(onNavigate).toHaveBeenCalledWith('/sales/new?ai=voice');
});
