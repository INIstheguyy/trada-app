import { Eye, EyeOff } from 'lucide-react';
import { useState, type InputHTMLAttributes } from 'react';
import { Input } from './Input';

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  hideLabel?: string;
  showLabel?: string;
};

export function PasswordInput({
  className = '',
  hideLabel = 'Hide password',
  showLabel = 'Show password',
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const actionLabel = visible ? hideLabel : showLabel;
  const VisibilityIcon = visible ? EyeOff : Eye;

  return (
    <div className="sd-password-input">
      <Input
        {...props}
        className={`sd-password-input__control ${className}`}
        type={visible ? 'text' : 'password'}
      />
      <button
        className="sd-password-input__toggle"
        type="button"
        aria-label={actionLabel}
        aria-pressed={visible}
        title={actionLabel}
        onClick={() => setVisible((current) => !current)}
      >
        <VisibilityIcon aria-hidden="true" size={19} strokeWidth={1.9} />
      </button>
    </div>
  );
}
