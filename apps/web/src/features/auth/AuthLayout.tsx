import { Boxes, CheckCircle2, ReceiptText, ShieldCheck } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';

type AuthLayoutProps = {
  children: ReactNode;
  description: string;
  eyebrow: string;
  title: string;
  trustMessage: string;
};

const supportedBenefits = [
  { icon: ReceiptText, label: 'Keep sales and payments clearly recorded' },
  { icon: Boxes, label: 'See stock levels and low-stock attention' },
  { icon: CheckCircle2, label: 'Act on business records you can verify' },
];

export function AuthLayout({
  children,
  description,
  eyebrow,
  title,
  trustMessage,
}: AuthLayoutProps) {
  return (
    <main className="access-layout">
      <aside className="access-story" aria-label="About Trada">
        <Link className="access-brand" to="/" aria-label="Trada home">
          <span className="sd-brand__mark">T</span>
          <span>
            <strong>Trada</strong>
            <small>Manage · Sell · Grow</small>
          </span>
        </Link>

        <div className="access-story__content">
          <p className="access-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>

          <ul className="access-benefits" aria-label="Supported Trada capabilities">
            {supportedBenefits.map(({ icon: Icon, label }) => (
              <li key={label}>
                <span>
                  <Icon aria-hidden="true" size={18} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="access-trust">
          <ShieldCheck aria-hidden="true" size={19} />
          <span>{trustMessage}</span>
        </div>
      </aside>

      <section className="access-panel">
        <div className="access-panel__inner">{children}</div>
      </section>
    </main>
  );
}

export function AuthHeading({
  eyebrow,
  title,
  description,
}: Omit<AuthLayoutProps, 'children' | 'trustMessage'>) {
  return (
    <header className="access-heading">
      <p className="access-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}
