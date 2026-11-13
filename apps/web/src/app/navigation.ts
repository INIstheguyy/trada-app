import type { AppShellNavigationItem } from '@trada/ui';
import { isCapabilityAvailable, type CapabilityId } from './capabilities';
import { can, type Action, type Role } from './permissions';

type MerchantNavigationItem = AppShellNavigationItem & {
  action: Action;
  capability: CapabilityId;
};

const merchantNavigation: MerchantNavigationItem[] = [
  {
    id: 'home',
    label: 'Overview',
    icon: 'home',
    href: '/',
    action: 'dashboard:view',
    capability: 'ownerOverview',
  },
  {
    id: 'sales',
    label: 'Sales',
    icon: 'sales',
    href: '/sales',
    action: 'sale:view',
    capability: 'sales',
  },
  {
    id: 'products',
    label: 'Inventory',
    icon: 'inventory',
    href: '/products',
    action: 'product:view',
    capability: 'inventory',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    href: '/settings/business',
    action: 'business:update',
    capability: 'businessSettings',
  },
];

export function getMerchantNavigation(role: Role): AppShellNavigationItem[] {
  return merchantNavigation
    .filter((item) => isCapabilityAvailable(item.capability) && can(role, item.action))
    .map(({ id, label, icon, href }) => ({ id, label, icon, href }));
}
