import {
  Boxes,
  CircleUserRound,
  House,
  LogOut,
  MoreHorizontal,
  Plus,
  ReceiptText,
  Settings,
  Sparkles,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState, type MouseEvent, type ReactNode } from 'react';

export type AppShellNavigationItem = {
  href: string;
  icon: 'home' | 'sales' | 'inventory' | 'settings';
  id: string;
  label: string;
};

export type AppShellAiAction = {
  href: string;
  icon: 'sales' | 'inventory';
  id: string;
  label: string;
  description: string;
};

export type AppShellAiBriefing = {
  meta?: string;
  status?: string;
  summary: string;
  title: string;
};

const icons: Record<AppShellNavigationItem['icon'], LucideIcon> = {
  home: House,
  sales: ReceiptText,
  inventory: Boxes,
  settings: Settings,
};

const aiActionIcons: Record<AppShellAiAction['icon'], LucideIcon> = {
  sales: ReceiptText,
  inventory: Boxes,
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
  aiActions?: AppShellAiAction[];
  aiBriefing?: AppShellAiBriefing;
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
  aiActions = [],
  aiBriefing,
}: AppShellProps) {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<'ai' | 'more' | null>(null);
  const initials = userName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  function handleNavigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    setMobilePanel(null);
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
      >
        {navigation.slice(0, 2).map(({ id, label, icon, href }) => {
          const Icon = icons[icon];
          return (
            <a
              className={`sd-bottom-nav__item ${activeNav === id ? 'is-active' : ''}`}
              href={href}
              key={label}
              aria-current={activeNav === id ? 'page' : undefined}
              onClick={(event) => handleNavigate(event, href)}
            >
              <Icon aria-hidden="true" size={17} />
              <span>{label}</span>
            </a>
          );
        })}
        <button
          className="sd-bottom-nav__ai"
          type="button"
          aria-label="Open AI assistant"
          aria-haspopup="dialog"
          aria-expanded={mobilePanel === 'ai'}
          onClick={() => setMobilePanel((panel) => (panel === 'ai' ? null : 'ai'))}
        >
          <span aria-hidden="true">
            <Sparkles size={22} />
          </span>
          <small>AI</small>
        </button>
        {navigation.slice(2, 3).map(({ id, label, icon, href }) => {
          const Icon = icons[icon];
          return (
            <a
              className={`sd-bottom-nav__item ${activeNav === id ? 'is-active' : ''}`}
              href={href}
              key={label}
              aria-current={activeNav === id ? 'page' : undefined}
              onClick={(event) => handleNavigate(event, href)}
            >
              <Icon aria-hidden="true" size={17} />
              <span>{label}</span>
            </a>
          );
        })}
        <button
          className="sd-bottom-nav__item sd-bottom-nav__more"
          type="button"
          aria-label="Open more navigation"
          aria-haspopup="dialog"
          aria-expanded={mobilePanel === 'more'}
          onClick={() => setMobilePanel((panel) => (panel === 'more' ? null : 'more'))}
        >
          <MoreHorizontal aria-hidden="true" size={17} />
          <span>More</span>
        </button>
      </nav>
      {mobilePanel && (
        <div className="sd-mobile-panel" role="dialog" aria-modal="true">
          <button
            className="sd-mobile-panel__backdrop"
            type="button"
            aria-label="Close menu"
            onClick={() => setMobilePanel(null)}
          />
          <section className="sd-mobile-panel__sheet" aria-labelledby="mobile-panel-title">
            <div className="sd-mobile-panel__heading">
              <div>
                <p>{mobilePanel === 'ai' ? 'TRADA AI' : 'WORKSPACE'}</p>
                <h2 id="mobile-panel-title">
                  {mobilePanel === 'ai' ? 'What would you like to capture?' : 'More options'}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobilePanel(null)}
              >
                <X aria-hidden="true" size={20} />
              </button>
            </div>
            {mobilePanel === 'ai' ? (
              <>
                {aiBriefing && (
                  <section className="sd-ai-briefing" aria-labelledby="ai-briefing-title">
                    <div className="sd-ai-briefing__title">
                      <span><Sparkles aria-hidden="true" size={17} /></span>
                      <div>
                        <h3 id="ai-briefing-title">{aiBriefing.title}</h3>
                        {aiBriefing.status && <small>{aiBriefing.status}</small>}
                      </div>
                    </div>
                    <p>{aiBriefing.summary}</p>
                    {aiBriefing.meta && <small className="sd-ai-briefing__meta">{aiBriefing.meta}</small>}
                  </section>
                )}
                <p className="sd-mobile-panel__intro">
                  Voice results are drafts. You review and confirm every sale or product yourself.
                </p>
                <div className="sd-ai-actions">
                  {aiActions.map((action) => {
                    const Icon = aiActionIcons[action.icon];
                    return (
                      <a
                        href={action.href}
                        key={action.id}
                        onClick={(event) => handleNavigate(event, action.href)}
                      >
                        <span className="sd-ai-actions__icon">
                          <Icon aria-hidden="true" size={20} />
                        </span>
                        <span>
                          <strong>{action.label}</strong>
                          <small>{action.description}</small>
                        </span>
                        <Plus aria-hidden="true" size={18} />
                      </a>
                    );
                  })}
                  {aiActions.length === 0 && (
                    <p className="sd-mobile-panel__empty">AI voice actions are unavailable for this role.</p>
                  )}
                </div>
              </>
            ) : (
              <div className="sd-mobile-more-actions">
                {navigation.slice(3).map(({ id, label, icon, href }) => {
                  const Icon = icons[icon];
                  return (
                    <a href={href} key={id} onClick={(event) => handleNavigate(event, href)}>
                      <Icon aria-hidden="true" size={20} />
                      <span>{label}</span>
                    </a>
                  );
                })}
                <button
                  type="button"
                  onClick={() => {
                    setMobilePanel(null);
                    setAccountMenuOpen(true);
                  }}
                >
                  <CircleUserRound aria-hidden="true" size={20} />
                  <span>Account</span>
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

function formatRole(role: string) {
  if (role === 'user') return 'Account user';
  return role.charAt(0).toUpperCase() + role.slice(1);
}
