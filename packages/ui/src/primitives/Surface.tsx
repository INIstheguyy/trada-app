import type { HTMLAttributes } from 'react';

export function Surface({ className = '', children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section className={`sd-surface ${className}`} {...props}>
      {children}
    </section>
  );
}
