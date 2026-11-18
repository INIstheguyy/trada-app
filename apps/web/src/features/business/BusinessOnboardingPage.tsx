import { Alert, Button, FormField, Input, Select, Textarea } from '@trada/ui';
import { Building2, CircleAlert, LoaderCircle } from 'lucide-react';
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

type OnboardingLocationState = { from?: string };

const initialBusiness: BusinessInput = {
  name: '',
  description: '',
  category: 'Inventory based',
  currency: 'NGN',
  industry: '',
};

const onboardingStory = {
  trustMessage: 'Your business starts private. This setup does not publish a storefront.',
};

export function BusinessOnboardingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const destination = (location.state as OnboardingLocationState | null)?.from ?? '/products/new';
  const businessQuery = useGetMyBusinessQuery();
  const [createBusiness, createState] = useCreateBusinessMutation();
  const [business, setBusiness] = useState(initialBusiness);
  const [error, setError] = useState<string>();

  if (businessQuery.data) return <Navigate to={destination} replace />;

  if (businessQuery.isLoading || businessQuery.isFetching) {
    return (
      <AuthLayout {...onboardingStory}>
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
      <AuthLayout {...onboardingStory}>
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

  return (
    <AuthLayout {...onboardingStory}>
      <div className="access-step" aria-label="Setup progress">
        <span>Account created</span>
        <strong>Business setup</strong>
      </div>

      <AuthHeading
        eyebrow="Business details"
        title="Create your workspace"
        description="Start with the required identity for your products, sales and reports."
      />

      <form className="access-form" onSubmit={handleSubmit}>
        {error && (
          <Alert tone="error" icon={<CircleAlert aria-hidden="true" size={18} />}>
            {error}
          </Alert>
        )}

        <BusinessField
          id="business-name"
          label="Business name"
          value={business.name}
          onChange={(name) => setBusiness({ ...business, name })}
          placeholder="e.g. Acme Motors"
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

        <BusinessField
          id="business-industry"
          label="Industry"
          value={business.industry}
          onChange={(industry) => setBusiness({ ...business, industry })}
          placeholder="e.g. Automotive, Retail, Food"
        />

        <Alert tone="info">
          Your workspace will remain private. Publishing is not part of this setup.
        </Alert>

        <Button
          type="submit"
          className="access-submit"
          loading={createState.isLoading}
          icon={<Building2 aria-hidden="true" size={18} />}
        >
          Create business
        </Button>
      </form>
    </AuthLayout>
  );
}

function BusinessField({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <FormField htmlFor={id} label={label}>
      <Input
        id={id}
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </FormField>
  );
}
