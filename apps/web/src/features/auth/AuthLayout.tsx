import { BrandLogo } from '@trada/ui';
import { ArrowRight, BarChart3, CreditCard, ShieldCheck, Store, X } from 'lucide-react';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { Link } from 'react-router';

type AuthLayoutProps = {
  children: ReactNode;
  initialMobileOpen?: boolean;
  mobileActionLabel?: string;
  mobileAlternateAction?: {
    label: string;
    prompt: string;
    to: string;
  };
  trustMessage?: string;
};

type AuthHeadingProps = {
  description: string;
  eyebrow: string;
  title: string;
};

const supportedBenefits = [
  {
    icon: Store,
    title: 'Get Your Own Website',
    description: 'Create a branded online store, showcase products and take orders.',
  },
  {
    icon: CreditCard,
    title: 'Sell More with BNPL',
    description: 'Let customers buy now and pay later through lending partners.',
  },
  {
    icon: BarChart3,
    title: 'Know Your Business',
    description: 'See sales, inventory, profits and cash flow in real time.',
  },
  {
    icon: ShieldCheck,
    title: 'Reduce Losses & Theft',
    description: 'Track stock movement, spot discrepancies and keep your business secure.',
  },
];

export function AuthLayout({
  children,
  initialMobileOpen = false,
  mobileActionLabel,
  mobileAlternateAction,
  trustMessage,
}: AuthLayoutProps) {
  const [mobilePanelOpen, setMobilePanelOpen] = useState(initialMobileOpen);
  const [sheetDragOffset, setSheetDragOffset] = useState(0);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dragStartYRef = useRef<number | null>(null);
  const hasMobileSheet = Boolean(mobileActionLabel);

  useEffect(() => {
    if (!hasMobileSheet) return;

    document.documentElement.classList.add('access-viewport-locked');
    return () => document.documentElement.classList.remove('access-viewport-locked');
  }, [hasMobileSheet]);

  useEffect(() => {
    if (!mobilePanelOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMobilePanelOpen(false);
        openButtonRef.current?.focus();
      }
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mobilePanelOpen]);

  function openMobilePanel() {
    setMobilePanelOpen(true);
    closeButtonRef.current?.focus();
  }

  function closeMobilePanel() {
    setSheetDragOffset(0);
    setMobilePanelOpen(false);
    openButtonRef.current?.focus();
  }

  function startSheetDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;

    dragStartYRef.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveSheet(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragStartYRef.current === null) return;

    setSheetDragOffset(Math.max(0, event.clientY - dragStartYRef.current));
  }

  function finishSheetDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragStartYRef.current === null) return;

    const dragDistance = Math.max(0, event.clientY - dragStartYRef.current);
    const shouldClose = dragDistance > Math.min(140, window.innerHeight * 0.14);
    dragStartYRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (shouldClose) {
      closeMobilePanel();
      return;
    }

    setSheetDragOffset(0);
  }

  return (
    <main className={`access-layout${hasMobileSheet ? ' access-layout--mobile-sheet' : ''}`}>
      <aside
        className={`access-story${trustMessage ? '' : ' access-story--without-trust'}`}
        aria-label="About Trada"
      >
        <Link className="access-brand" to="/" aria-label="Trada home">
          <BrandLogo className="access-brand__logo" tone="light" />
        </Link>

        <div className="access-story__content">
          <div className="access-story__intro">
            <p className="access-eyebrow">AI-powered business management</p>
            <h1>
            Run Your Business Smarter with <span>Trada AI.</span>
            </h1>
            <p>
            Record sales, manage stock, track profits, reduce losses and sell more — simply by
            speaking, snapping or typing.
            </p>
          </div>

          <ul className="access-benefits" aria-label="Trada business benefits">
            {supportedBenefits.map(({ icon: Icon, title, description }) => (
              <li key={title}>
                <span className="access-benefits__icon">
                  <Icon aria-hidden="true" size={22} />
                </span>
                <span className="access-benefits__copy">
                  <strong>{title}</strong>
                  <small>{description}</small>
                </span>
              </li>
            ))}
          </ul>

          {mobileActionLabel && (
            <div className="access-mobile-actions">
              <button
                ref={openButtonRef}
                className="access-mobile-trigger"
                type="button"
                aria-controls="access-account-panel"
                aria-expanded={mobilePanelOpen}
                onClick={openMobilePanel}
              >
                <span>{mobileActionLabel}</span>
                <ArrowRight aria-hidden="true" size={23} />
              </button>

              {mobileAlternateAction && (
                <p>
                  {mobileAlternateAction.prompt}{' '}
                  <Link to={mobileAlternateAction.to}>{mobileAlternateAction.label}</Link>
                </p>
              )}
            </div>
          )}
        </div>

        {trustMessage && (
          <div className="access-trust">
            <ShieldCheck aria-hidden="true" size={19} />
            <span>{trustMessage}</span>
          </div>
        )}
      </aside>

      <section
        id="access-account-panel"
        className={`access-panel${hasMobileSheet ? ' access-panel--sheet' : ''}${
          mobilePanelOpen ? ' is-mobile-open' : ''
        }${sheetDragOffset > 0 ? ' is-dragging' : ''}`}
        style={
          hasMobileSheet
            ? ({ '--access-sheet-drag-y': `${sheetDragOffset}px` } as CSSProperties)
            : undefined
        }
      >
        {hasMobileSheet && (
          <div
            className="access-sheet-bar"
            onPointerDown={startSheetDrag}
            onPointerMove={moveSheet}
            onPointerUp={finishSheetDrag}
            onPointerCancel={finishSheetDrag}
          >
            <span className="access-sheet-handle" aria-hidden="true" />
            <button
              ref={closeButtonRef}
              className="access-sheet-close"
              type="button"
              aria-label={`Close ${mobileActionLabel?.toLowerCase()} form`}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={closeMobilePanel}
            >
              <X aria-hidden="true" size={21} />
            </button>
          </div>
        )}
        <div className="access-panel__inner">{children}</div>
      </section>
    </main>
  );
}

export function AuthHeading({ eyebrow, title, description }: AuthHeadingProps) {
  return (
    <header className="access-heading">
      <p className="access-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}
