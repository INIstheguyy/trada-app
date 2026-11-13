import type { HTMLAttributes, ReactNode } from 'react';

type PageHeaderProps = HTMLAttributes<HTMLElement> & {
  actions?: ReactNode;
  description?: ReactNode;
  eyebrow?: string;
  title: string;
};

export function PageHeader({
  actions,
  className = '',
  description,
  eyebrow,
  title,
  ...props
}: PageHeaderProps) {
  return (
    <header className={`sd-page-header ${className}`} {...props}>
      <div className="sd-page-header__copy">
        {eyebrow && <p className="sd-page-header__eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="sd-page-header__description">{description}</p>}
      </div>
      {actions && <div className="sd-page-header__actions">{actions}</div>}
    </header>
  );
}
