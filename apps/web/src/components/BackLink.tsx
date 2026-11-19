import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';

type BackLinkProps = {
  to: string;
  children: ReactNode;
  className?: string;
};

export function BackLink({ to, children, className = '' }: BackLinkProps) {
  return (
    <Link className={`back-link ${className}`} to={to}>
      <ArrowLeft aria-hidden="true" size={16} /> {children}
    </Link>
  );
}
