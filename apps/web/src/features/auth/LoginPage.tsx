import { Button } from '@trada/ui';
import { FlaskConical, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useLazyGetProfileQuery, useLoginMutation } from '../../lib/api';
import { readApiError } from '../../lib/apiError';
import {
  DEMO_ACCESS_TOKEN,
  DEMO_EMAIL,
  DEMO_PASSWORD,
  DEMO_REFRESH_TOKEN,
  demoUser,
  isDemoCredentials,
} from '../../mocks/demoApi';
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

    if (isDemoCredentials(email.trim(), password)) {
      enterDemo();
      return;
    }

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

  function enterDemo() {
    dispatch(
      sessionEstablished({
        accessToken: DEMO_ACCESS_TOKEN,
        refreshToken: DEMO_REFRESH_TOKEN,
        user: demoUser,
      }),
    );
    navigate(destination, { replace: true });
  }

  return (
    <main className="auth-page">
      <section className="auth-intro" aria-label="Trada introduction">
        <a className="auth-brand" href="/" aria-label="Trada home">
          <span className="sd-brand__mark">T</span>
          <strong>Trada</strong>
        </a>
        <div>
          <p className="eyebrow">Your business, clearly understood</p>
          <h1>Know what’s happening—even when you’re away.</h1>
          <p>
            Track sales, stock, cash and customer balances from one trustworthy business record.
          </p>
        </div>
        <div className="auth-trust">
          <ShieldCheck aria-hidden="true" size={20} />
          <span>Your financial information stays private to authorised users.</span>
        </div>
      </section>

      <section className="auth-form-panel">
        <div className="auth-form-wrap">
          <div className="auth-form-heading">
            <p className="eyebrow">Welcome back</p>
            <h2>Sign in to Trada</h2>
            <p>Use the email and password connected to your account.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {locationState?.registrationComplete && (
              <div className="auth-success" role="status">
                Your account is ready. Sign in to continue.
              </div>
            )}
            {error && (
              <div className="auth-error" role="alert">
                {error}
              </div>
            )}

            <label className="auth-field">
              <span>Email address</span>
              <span className="auth-input-wrap">
                <Mail aria-hidden="true" size={18} />
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@business.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </span>
            </label>

            <label className="auth-field">
              <span>Password</span>
              <span className="auth-input-wrap">
                <LockKeyhole aria-hidden="true" size={18} />
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  minLength={8}
                  required
                />
              </span>
            </label>

            <Button type="submit" loading={isLoading} className="auth-submit">
              Sign in
            </Button>
          </form>

          {import.meta.env.DEV && (
            <div className="demo-login">
              <div>
                <span className="demo-login__icon">
                  <FlaskConical aria-hidden="true" size={18} />
                </span>
                <div>
                  <strong>Explore the frontend demo</strong>
                  <p>
                    Owner access with sample products and sales. Changes reset when the dev server
                    restarts.
                  </p>
                </div>
              </div>
              <dl>
                <div>
                  <dt>Email</dt>
                  <dd>{DEMO_EMAIL}</dd>
                </div>
                <div>
                  <dt>Password</dt>
                  <dd>{DEMO_PASSWORD}</dd>
                </div>
              </dl>
              <Button type="button" variant="secondary" onClick={enterDemo}>
                Use demo account
              </Button>
            </div>
          )}

          <p className="auth-help">
            New to Trada? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
