import { FormField, Input } from '@trada/ui';
import type { InputHTMLAttributes } from 'react';

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  showRequiredMarker?: boolean;
  hint?: string;
  error?: string;
};

export function TextField({
  id,
  label,
  value,
  onChange,
  required = false,
  showRequiredMarker = required,
  hint,
  error,
  type = 'text',
  ...props
}: TextFieldProps) {
  return (
    <FormField htmlFor={id} label={label} required={showRequiredMarker} hint={hint} error={error}>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        {...props}
      />
    </FormField>
  );
}

type NumberFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value' | 'type'
> & {
  id: string;
  label: string;
  value: number | null | undefined;
  onChange: (value: number | null) => void;
  required?: boolean;
  showRequiredMarker?: boolean;
  hint?: string;
  error?: string;
  min?: number | string;
  step?: number | string;
};

export function NumberField({
  id,
  label,
  value,
  onChange,
  required = false,
  showRequiredMarker = required,
  hint,
  error,
  min = '0',
  step = '0.01',
  ...props
}: NumberFieldProps) {
  return (
    <FormField htmlFor={id} label={label} required={showRequiredMarker} hint={hint} error={error}>
      <Input
        id={id}
        type="number"
        min={min}
        step={step}
        value={value ?? ''}
        onChange={(event) =>
          onChange(event.target.value === '' ? null : Number(event.target.value))
        }
        required={required}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        inputMode="decimal"
        {...props}
      />
    </FormField>
  );
}
