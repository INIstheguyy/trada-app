import { Boxes, CircleUserRound, House, LogOut, Plus, ReceiptText, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState, type MouseEvent, type ReactNode } from 'react';

export type AppShellNavigationItem = {
  href: string;
  icon: 'home' | 'sales' | 'inventory' | 'settings';
  id: string;
  label: string;
};

const icons: Record<AppShellNavigationItem['icon'], LucideIcon> = {
  home: House,
  sales: ReceiptText,
  inventory: Boxes,
  settings: Settings,
};

const defaultNavigation: AppShellNavigationItem[] = [
  { id: 'home', label: 'Overview', icon: 'home', href: '/' },
  { id: 'sales', label: 'Sales', icon: 'sales', href: '/sales' },
  { id: 'products', label: 'Inventory', icon: 'inventory', href: '/products' },
  { id: 'settings', label: 'Settings', icon: 'settings', href: '/settings/business' },
];

type AppShellProps = {
  children: ReactNode;
  userName?: string;
  userRole?: string;
  businessName?: string;
  navigation?: AppShellNavigationItem[];
  onNavigate?: (href: string) => void;
  onSignOut?: () => void;
  activeNav?: string;
  recordSaleHref?: string;
};

export function AppShell({
  children,
  userName = 'Trada user',
  userRole = 'user',
  businessName = 'Your business',
  navigation = defaultNavigation,
  onNavigate,
  onSignOut,
  activeNav = 'home',
  recordSaleHref,
}: AppShellProps) {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const initials = userName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  function handleNavigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(href);
  }

  return (
    <div className="sd-shell">
      <aside className="sd-sidebar" aria-label="Primary navigation">
        <a
          className="sd-brand"
          href="/"
          aria-label="Trada overview"
          onClick={(event) => handleNavigate(event, '/')}
        >
          <img className="sd-brand__logo" src="/trada-logo.jpeg" alt="" />
        </a>
        <nav className="sd-nav">
          {navigation.map(({ id, label, icon, href }) => {
            const Icon = icons[icon];
            return (
              <a
                className={`sd-nav__item ${activeNav === id ? 'is-active' : ''}`}
                href={href}
                key={label}
                aria-current={activeNav === id ? 'page' : undefined}
                onClick={(event) => handleNavigate(event, href)}
              >
                <Icon aria-hidden="true" size={21} />
                <span>{label}</span>
              </a>
            );
          })}
        </nav>
        <div className="sd-sidebar__profile">
          <span className="sd-avatar">{initials}</span>
          <span className="sd-profile-copy">
            <strong>{userName}</strong>
            <small>{formatRole(userRole)}</small>
          </span>
          {onSignOut && (
            <button className="sd-signout" type="button" onClick={onSignOut} aria-label="Sign out">
              <LogOut aria-hidden="true" size={18} />
            </button>
          )}
        </div>
      </aside>
      <div className="sd-shell__body">
        <header className="sd-topbar">
          <a
            className="sd-mobile-brand"
            href="/"
            aria-label="Trada home"
            onClick={(event) => handleNavigate(event, '/')}
          >
            <img className="sd-mobile-brand__logo" src="/trada-logo.jpeg" alt="" />
          </a>
          <div className="sd-business">
            <span>
              <small>Viewing business</small>
              <strong>{businessName}</strong>
            </span>
            <div className="sd-account">
              <button
                className="sd-account__trigger"
                type="button"
                onClick={() => setAccountMenuOpen((open) => !open)}
                aria-label="Open account menu"
                aria-expanded={accountMenuOpen}
                aria-haspopup="menu"
              >
                <CircleUserRound aria-hidden="true" size={28} />
              </button>
              {accountMenuOpen && (
                <div className="sd-account__menu" role="menu">
                  <div className="sd-account__identity">
                    <span className="sd-avatar">{initials}</span>
                    <span>
                      <strong>{userName}</strong>
                      <small>{formatRole(userRole)}</small>
                    </span>
                  </div>
                  {onSignOut && (
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setAccountMenuOpen(false);
                        onSignOut();
                      }}
                    >
                      <LogOut aria-hidden="true" size={17} />
                      Sign out
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="sd-main">{children}</main>
      </div>
      {recordSaleHref && (
        <a
          className="sd-fab"
          href={recordSaleHref}
          aria-label="Record a sale"
          onClick={(event) => handleNavigate(event, recordSaleHref)}
        >
          <Plus aria-hidden="true" size={25} />
        </a>
      )}
      <nav
        className="sd-bottom-nav"
        aria-label="Mobile navigation"
        style={{ gridTemplateColumns: `repeat(${Math.max(navigation.length, 1)}, minmax(0, 1fr))` }}
      >
        {navigation.slice(0, 4).map(({ id, label, icon, href }) => {
          const Icon = icons[icon];
          return (
            <a
              className={`sd-bottom-nav__item ${activeNav === id ? 'is-active' : ''}`}
              href={href}
              key={label}
              aria-current={activeNav === id ? 'page' : undefined}
              onClick={(event) => handleNavigate(event, href)}
            >
              <Icon aria-hidden="true" size={21} />
              <span>{label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

function formatRole(role: string) {
  if (role === 'user') return 'Account user';
  return role.charAt(0).toUpperCase() + role.slice(1);
}
