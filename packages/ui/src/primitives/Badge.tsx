import type { HTMLAttributes } from 'react';

type BadgeTone = 'success' | 'warning' | 'error' | 'info';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

export function Badge({ className = '', tone = 'success', children, ...props }: BadgeProps) {
  return (
    <span className={`sd-badge sd-badge--${tone} ${className}`} {...props}>
      {children}
    </span>
  );
}
