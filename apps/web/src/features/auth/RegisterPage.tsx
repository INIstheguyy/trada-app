import { Button } from '@trada/ui';
import { LockKeyhole, Mail, Phone, ShieldCheck, UserRound } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { useRegisterMutation } from '../../lib/api';
import { readApiError } from '../../lib/apiError';

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
    <main className="auth-page auth-page--register">
      <section className="auth-intro" aria-label="Trada introduction">
        <Link className="auth-brand" to="/" aria-label="Trada home">
          <span className="sd-brand__mark">T</span>
          <strong>Trada</strong>
        </Link>
        <div>
          <p className="eyebrow">Start with a trustworthy record</p>
          <h1>Create your Trada account.</h1>
          <p>
            This creates your personal account. We’ll guide you through setting up your business
            separately.
          </p>
        </div>
        <div className="auth-trust">
          <ShieldCheck aria-hidden="true" size={20} />
          <span>Your password is sent securely and is never shown back to you.</span>
        </div>
      </section>

      <section className="auth-form-panel">
        <div className="auth-form-wrap">
          <div className="auth-form-heading">
            <p className="eyebrow">Create account</p>
            <h2>Tell us about yourself</h2>
            <p>Use details you can access when you need to recover your account.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && (
              <div className="auth-error" role="alert">
                {error}
              </div>
            )}

            <div className="auth-field-row">
              <AuthField
                label="First name"
                name="firstName"
                autoComplete="given-name"
                value={firstName}
                onChange={setFirstName}
                icon={UserRound}
              />
              <AuthField
                label="Last name"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={setLastName}
                icon={UserRound}
              />
            </div>

            <AuthField
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@business.com"
              value={email}
              onChange={setEmail}
              icon={Mail}
            />

            <AuthField
              label="Phone number"
              name="phoneNumber"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="0801 234 5678"
              value={phoneNumber}
              onChange={setPhoneNumber}
              icon={Phone}
            />

            <div className="auth-field-row">
              <AuthField
                label="Password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={setPassword}
                icon={LockKeyhole}
                minLength={8}
              />
              <AuthField
                label="Confirm password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                icon={LockKeyhole}
                minLength={8}
              />
            </div>

            <p className="auth-password-note">Use at least 8 characters.</p>

            <Button type="submit" loading={isLoading} className="auth-submit">
              Create account
            </Button>
          </form>

          <p className="auth-help">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

type AuthFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  icon: typeof UserRound;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: 'tel' | 'email' | 'text';
  minLength?: number;
};

function AuthField({
  label,
  value,
  onChange,
  icon: Icon,
  type = 'text',
  ...input
}: AuthFieldProps) {
  return (
    <label className="auth-field">
      <span>{label}</span>
      <span className="auth-input-wrap">
        <Icon aria-hidden="true" size={18} />
        <input
          {...input}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required
        />
      </span>
    </label>
  );
}
