import { Alert, Button, FormField, Input } from '@trada/ui';
import { CircleAlert } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { useRegisterMutation } from '../../lib/api';
import { readApiError } from '../../lib/apiError';
import { AuthHeading, AuthLayout } from './AuthLayout';

export function RegisterPage() {
  const navigate = useNavigate();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [register, { isLoading }] = useRegisterMutation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string>();

  if (accessToken) return <Navigate to="/" replace />;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);

    if (password !== confirmPassword) {
      setError('The passwords do not match.');
      return;
    }

    try {
      await register({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        password,
      }).unwrap();

      navigate('/login', {
        replace: true,
        state: { registrationComplete: true, email: email.trim() },
      });
    } catch (reason) {
      setError(
        readApiError(reason, 'We couldn’t create your account. Check your details and try again.'),
      );
    }
  }

  return (
    <AuthLayout
      eyebrow="Start with a trustworthy record"
      title="Set up the account that will own your business workspace."
      description="Create your personal account first. Your business details stay separate and come next."
      trustMessage="Your password is transmitted securely and is never displayed back to you."
    >
      <AuthHeading
        eyebrow="Create account"
        title="Tell us about yourself"
        description="Use contact details you control and can access again."
      />

      <form className="access-form" onSubmit={handleSubmit}>
        {error && (
          <Alert tone="error" icon={<CircleAlert aria-hidden="true" size={18} />}>
            {error}
          </Alert>
        )}

        <div className="access-field-row">
          <AccountField
            id="first-name"
            label="First name"
            name="firstName"
            autoComplete="given-name"
            value={firstName}
            onChange={setFirstName}
          />
          <AccountField
            id="last-name"
            label="Last name"
            name="lastName"
            autoComplete="family-name"
            value={lastName}
            onChange={setLastName}
          />
        </div>

        <AccountField
          id="register-email"
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@business.com"
          value={email}
          onChange={setEmail}
        />

        <AccountField
          id="phone-number"
          label="Phone number"
          name="phoneNumber"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="0801 234 5678"
          value={phoneNumber}
          onChange={setPhoneNumber}
        />

        <div className="access-field-row">
          <AccountField
            id="register-password"
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={setPassword}
            minLength={8}
            hint="Use at least 8 characters."
          />
          <AccountField
            id="confirm-password"
            label="Confirm password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            minLength={8}
          />
        </div>

        <Button type="submit" loading={isLoading} className="access-submit">
          Create account
        </Button>
      </form>

      <p className="access-footer">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </AuthLayout>
  );
}

type AccountFieldProps = {
  autoComplete?: string;
  hint?: string;
  id: string;
  inputMode?: 'tel' | 'email' | 'text';
  label: string;
  minLength?: number;
  name: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  value: string;
};

function AccountField({
  label,
  id,
  hint,
  value,
  onChange,
  type = 'text',
  ...input
}: AccountFieldProps) {
  return (
    <FormField htmlFor={id} label={label} hint={hint}>
      <Input
        {...input}
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={hint ? `${id}-hint` : undefined}
        required
      />
    </FormField>
  );
}
