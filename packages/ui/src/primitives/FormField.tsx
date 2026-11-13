import type { HTMLAttributes, ReactNode } from 'react';

type FormFieldProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children: ReactNode;
  error?: string;
  hint?: string;
  htmlFor: string;
  label: string;
  required?: boolean;
};

export function FormField({
  children,
  className = '',
  error,
  hint,
  htmlFor,
  label,
  required,
  ...props
}: FormFieldProps) {
  return (
    <div className={`sd-field ${className}`} {...props}>
      <label className="sd-field__label" htmlFor={htmlFor}>
        {label}{' '}
        {required && (
          <span className="sd-field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p className="sd-field__error" id={`${htmlFor}-error`}>
          {error}
        </p>
      ) : hint ? (
        <p className="sd-field__hint" id={`${htmlFor}-hint`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
