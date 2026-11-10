import { Slot } from '@radix-ui/react-slot';
import { LoaderCircle } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: ReactNode;
};

export function Button({
  asChild,
  loading,
  variant = 'primary',
  icon,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  if (asChild) {
    return (
      <Slot className={`sd-button sd-button--${variant} ${className}`} {...props}>
        {children}
      </Slot>
    );
  }

  return (
    <button
      className={`sd-button sd-button--${variant} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <LoaderCircle aria-hidden="true" className="sd-spin" size={18} /> : icon}
      {children}
    </button>
  );
}
