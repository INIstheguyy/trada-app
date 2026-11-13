import type { HTMLAttributes, ReactNode } from 'react';

type AlertProps = HTMLAttributes<HTMLDivElement> & {
  icon?: ReactNode;
  tone?: 'info' | 'success' | 'warning' | 'error';
};

export function Alert({
  children,
  className = '',
  icon,
  role,
  tone = 'info',
  ...props
}: AlertProps) {
  const resolvedRole = role ?? (tone === 'error' ? 'alert' : 'status');
  return (
    <div className={`sd-alert sd-alert--${tone} ${className}`} role={resolvedRole} {...props}>
      {icon}
      <div>{children}</div>
    </div>
  );
}
