import type { HTMLAttributes, ReactNode } from 'react';
import { Surface } from '../primitives/Surface';

type EmptyStateProps = HTMLAttributes<HTMLElement> & {
  action?: ReactNode;
  description: ReactNode;
  icon?: ReactNode;
  title: string;
};

export function EmptyState({
  action,
  className = '',
  description,
  icon,
  title,
  ...props
}: EmptyStateProps) {
  return (
    <Surface className={`sd-empty-state ${className}`} {...props}>
      <div className="sd-empty-state__content">
        {icon && <span className="sd-empty-state__icon">{icon}</span>}
        <h2>{title}</h2>
        <p>{description}</p>
        {action}
      </div>
    </Surface>
  );
}
