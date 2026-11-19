import { Alert, Button, FormField, Input, PasswordInput } from '@trada/ui';
import { CheckCircle2, CircleAlert } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useLazyGetProfileQuery, useLoginMutation } from '../../lib/api';
import { readApiError } from '../../lib/apiError';
import { AuthHeading, AuthLayout } from './AuthLayout';
import { profileUpdated, sessionEstablished } from './authSlice';

type LocationState = { from?: string; registrationComplete?: boolean; email?: string };

export function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [login, { isLoading }] = useLoginMutation();
  const [getProfile] = useLazyGetProfileQuery();
  const locationState = location.state as LocationState | null;
  const [email, setEmail] = useState(locationState?.email ?? '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>();

  if (accessToken) return <Navigate to="/" replace />;

  const destination = locationState?.from ?? '/';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);

    try {
      const result = await login({ email: email.trim(), password }).unwrap();
      dispatch(
        sessionEstablished({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          user: result.user ?? null,
        }),
      );

      try {
        const profile = await getProfile().unwrap();
        dispatch(profileUpdated(profile));
      } catch {
        // Login remains valid when profile enrichment is temporarily unavailable.
      }

      navigate(destination, { replace: true });
    } catch (reason) {
      setError(readApiError(reason, 'We couldn’t sign you in. Check your details and try again.'));
    }
  }

  return (
    <AuthLayout
      initialMobileOpen={Boolean(locationState?.registrationComplete)}
      mobileActionLabel="Sign in"
      mobileAlternateAction={{
        prompt: 'New to Trada?',
        label: 'Create an account',
        to: '/register',
      }}
    >
      <AuthHeading
        eyebrow="Welcome back"
        title="Welcome back"
        description="Access your Trada business account."
      />

      <form className="access-form" onSubmit={handleSubmit}>
        {locationState?.registrationComplete && (
          <Alert tone="success" icon={<CheckCircle2 aria-hidden="true" size={18} />}>
            Your account is ready. Sign in to continue.
          </Alert>
        )}
        {error && (
          <Alert tone="error" icon={<CircleAlert aria-hidden="true" size={18} />}>
            {error}
          </Alert>
        )}

        <FormField htmlFor="login-email" label="Email address">
          <Input
            id="login-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@business.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </FormField>

        <FormField htmlFor="login-password" label="Password">
          <PasswordInput
            id="login-password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            required
          />
        </FormField>

        <Button type="submit" loading={isLoading} className="access-submit">
          Sign in
        </Button>
      </form>

      <p className="access-footer">
        New to Trada? <Link to="/register">Create an account</Link>
      </p>
    </AuthLayout>
  );
}
