import { Alert, Button, FormField, Input, Select, Textarea } from '@trada/ui';
import { ArrowLeft, ArrowRight, Building2, CircleAlert, LoaderCircle } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { AuthHeading, AuthLayout } from '../auth/AuthLayout';
import {
  useCreateBusinessMutation,
  useGetMyBusinessQuery,
  type BusinessInput,
} from '../../lib/api';
import { readApiError } from '../../lib/apiError';
import { apiStatus } from '../../lib/apiStatus';
import { TextField } from '../../components/FormFields';

type OnboardingLocationState = { from?: string };

const initialBusiness: BusinessInput = {
  name: '',
  description: '',
  category: 'Inventory based',
  currency: 'NGN',
  industry: '',
};

export function BusinessOnboardingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const destination = (location.state as OnboardingLocationState | null)?.from ?? '/';
  const businessQuery = useGetMyBusinessQuery();
  const [createBusiness, createState] = useCreateBusinessMutation();
  const [business, setBusiness] = useState(initialBusiness);
  const [error, setError] = useState<string>();
  const [setupStep, setSetupStep] = useState<1 | 2>(1);

  if (businessQuery.data) return <Navigate to={destination} replace />;

  if (businessQuery.isLoading || businessQuery.isFetching) {
    return (
      <AuthLayout>
        <div className="access-state" role="status">
          <span className="access-state__icon">
            <LoaderCircle className="sd-spin" aria-hidden="true" size={24} />
          </span>
          <h2>Checking your workspace</h2>
          <p>We’re confirming whether your account already has a business.</p>
        </div>
      </AuthLayout>
    );
  }

  if (apiStatus(businessQuery.error) !== 404) {
    return (
      <AuthLayout>
        <div className="access-state" role="alert">
          <span className="access-state__icon access-state__icon--error">
            <CircleAlert aria-hidden="true" size={24} />
          </span>
          <h2>We couldn’t check your business</h2>
          <p>Your account is safe. Check your connection and try again.</p>
          <Button type="button" onClick={() => void businessQuery.refetch()}>
            Try again
          </Button>
        </div>
      </AuthLayout>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);

    if (setupStep === 1) {
      continueToBusinessOperations();
      return;
    }

    try {
      await createBusiness({
        name: business.name.trim(),
        description: business.description.trim(),
        category: business.category,
        currency: business.currency,
        industry: business.industry.trim(),
      }).unwrap();
      navigate(destination, { replace: true });
    } catch (reason) {
      const message = readApiError(reason, 'We couldn’t create your business. Try again.');

      if (message.toLowerCase().includes('already has a registered business')) {
        try {
          await businessQuery.refetch().unwrap();
          navigate(destination, { replace: true });
          return;
        } catch {
          // Preserve the backend message when the follow-up lookup also fails.
        }
      }

      setError(message);
    }
  }

  function continueToBusinessOperations() {
    if (!business.name.trim() || !business.description.trim()) {
      setError('Enter your business name and description to continue.');
      return;
    }

    setError(undefined);
    setSetupStep(2);
    window.requestAnimationFrame(() => document.getElementById('business-category')?.focus());
  }

  function returnToBusinessIdentity() {
    setError(undefined);
    setSetupStep(1);
    window.requestAnimationFrame(() => document.getElementById('business-name')?.focus());
  }

  return (
    <AuthLayout mobileActionLabel="Set up your business">
      <div className="onboarding-progress" aria-label={`Business setup, step ${setupStep} of 2`}>
        <span className={setupStep === 1 ? 'is-current' : 'is-complete'}>
          <b>1</b> Business profile
        </span>
        <i aria-hidden="true" />
        <span className={setupStep === 2 ? 'is-current' : ''}>
          <b>2</b> Business operations
        </span>
      </div>

      <AuthHeading
        eyebrow="Business details"
        title="Create your workspace"
        description="Start with the required identity for your products, sales and reports."
      />

      <form className="access-form access-form--onboarding" onSubmit={handleSubmit}>
        {error && (
          <Alert tone="error" icon={<CircleAlert aria-hidden="true" size={18} />}>
            {error}
          </Alert>
        )}

        <section
          className={`onboarding-stage${setupStep !== 1 ? ' is-hidden' : ''}`}
          aria-labelledby="business-profile-heading"
        >
          <header className="onboarding-stage__heading">
            <span>Step 1 of 2</span>
            <h3 id="business-profile-heading">Tell us about your business</h3>
            <p>Start with the name customers know and a short description.</p>
          </header>

          <TextField
            id="business-name"
            label="Business name"
            value={business.name}
            onChange={(name) => setBusiness({ ...business, name })}
            placeholder="e.g. Acme Motors"
            required
            showRequiredMarker={false}
          />

          <FormField htmlFor="business-description" label="Business description">
            <Textarea
              id="business-description"
              required
              rows={3}
              value={business.description}
              onChange={(event) => setBusiness({ ...business, description: event.target.value })}
              placeholder="What does your business sell or provide?"
            />
          </FormField>

          <Button
            type="button"
            className="onboarding-next"
            icon={<ArrowRight aria-hidden="true" size={18} />}
            onClick={continueToBusinessOperations}
          >
            Continue
          </Button>
        </section>

        <section
          className={`onboarding-stage${setupStep !== 2 ? ' is-hidden' : ''}`}
          aria-labelledby="business-operations-heading"
        >
          <header className="onboarding-stage__heading">
            <span>Step 2 of 2</span>
            <h3 id="business-operations-heading">How does your business operate?</h3>
            <p>These details configure your stock, sales and reporting defaults.</p>
          </header>

          <div className="access-field-row">
            <FormField htmlFor="business-category" label="Business category">
              <Select
                id="business-category"
                value={business.category}
                onChange={(event) => setBusiness({ ...business, category: event.target.value })}
              >
                <option value="Inventory based">Inventory based</option>
                <option value="Input based">Input based</option>
              </Select>
            </FormField>
            <FormField htmlFor="business-currency" label="Working currency">
              <Select
                id="business-currency"
                value={business.currency}
                onChange={(event) => setBusiness({ ...business, currency: event.target.value })}
              >
                <option value="NGN">Nigerian naira (NGN)</option>
              </Select>
            </FormField>
          </div>

          <TextField
            id="business-industry"
            label="Industry"
            value={business.industry}
            onChange={(industry) => setBusiness({ ...business, industry })}
            placeholder="e.g. Automotive, Retail, Food"
            required
            showRequiredMarker={false}
          />

          <div className="onboarding-step-actions">
            <Button
              type="button"
              variant="secondary"
              className="onboarding-back"
              icon={<ArrowLeft aria-hidden="true" size={18} />}
              onClick={returnToBusinessIdentity}
            >
              Back
            </Button>
            <Button
              type="submit"
              className="access-submit"
              loading={createState.isLoading}
              icon={<Building2 aria-hidden="true" size={18} />}
            >
              Create business
            </Button>
          </div>
        </section>
      </form>
    </AuthLayout>
  );
}

