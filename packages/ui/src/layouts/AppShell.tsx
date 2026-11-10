import {
  BarChart3,
  Boxes,
  CircleUserRound,
  House,
  LogOut,
  Plus,
  ReceiptText,
  Store,
} from 'lucide-react';
import type { ReactNode } from 'react';

const navItems = [
  { id: 'home', label: 'Home', icon: House, href: '/' },
  { id: 'sales', label: 'Sales', icon: ReceiptText, href: '/sales' },
  { id: 'products', label: 'Inventory', icon: Boxes, href: '/products' },
  { id: 'storefront', label: 'Storefront', icon: Store, href: '/storefront' },
  { id: 'reports', label: 'Reports', icon: BarChart3, href: '/reports' },
];

type AppShellProps = {
  children: ReactNode;
  userName?: string;
  userRole?: string;
  businessName?: string;
  onSignOut?: () => void;
  activeNav?: string;
};

export function AppShell({
  children,
  userName = 'Trada user',
  userRole = 'user',
  businessName = 'Oasis Gadgets',
  onSignOut,
  activeNav = 'home',
}: AppShellProps) {
  const initials = userName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="sd-shell">
      <aside className="sd-sidebar" aria-label="Primary navigation">
        <div className="sd-brand">
          <span className="sd-brand__mark">S</span>
          <span className="sd-brand__name">Trada</span>
        </div>
        <nav className="sd-nav">
          {navItems.map(({ id, label, icon: Icon, href }) => (
            <a
              className={`sd-nav__item ${activeNav === id ? 'is-active' : ''}`}
              href={href}
              key={label}
              aria-current={activeNav === id ? 'page' : undefined}
            >
              <Icon aria-hidden="true" size={21} />
              <span>{label}</span>
            </a>
          ))}
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
          <a className="sd-mobile-brand" href="/" aria-label="Trada home">
            <span className="sd-brand__mark">S</span>
            <strong>Trada</strong>
          </a>
          <div className="sd-business">
            <span>
              <small>Viewing business</small>
              <strong>{businessName}</strong>
            </span>
            <button
              className="sd-mobile-signout"
              type="button"
              onClick={onSignOut}
              aria-label="Sign out"
            >
              <CircleUserRound aria-hidden="true" size={28} />
            </button>
          </div>
        </header>
        <main className="sd-main">{children}</main>
      </div>
      <a className="sd-fab" href="#record-sale" aria-label="Record a sale">
        <Plus aria-hidden="true" size={25} />
      </a>
      <nav className="sd-bottom-nav" aria-label="Mobile navigation">
        {navItems.slice(0, 4).map(({ id, label, icon: Icon, href }) => (
          <a
            className={`sd-bottom-nav__item ${activeNav === id ? 'is-active' : ''}`}
            href={href}
            key={label}
            aria-current={activeNav === id ? 'page' : undefined}
          >
            <Icon aria-hidden="true" size={21} />
            <span>{label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}

function formatRole(role: string) {
  if (role === 'user') return 'Account user';
  return role.charAt(0).toUpperCase() + role.slice(1);
}
