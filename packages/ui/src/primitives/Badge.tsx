import type { HTMLAttributes } from 'react';

export function Badge({ className = '', children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={`sd-badge ${className}`} {...props}>
      {children}
    </span>
  );
}
